<?php

namespace App\Http\Controllers;

use App\Models\Publication;
use App\Models\PublicationCategory;
use App\Models\Service;
use App\Models\Subscriber;
use App\Models\Partner;
use App\Models\TeamMember;
use App\Models\Testimony;
use App\Models\User;
use App\Notifications\ContactNotification;
use App\Notifications\QuoteNotification;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;

class FrontendController extends Controller
{
    public function home()
    {
        $testimonies = Testimony::orderBy('id', 'DESC')->whereIsActive(1)->take(5)->get();
        $publications = [];
        foreach (Publication::orderBy('id', 'DESC')->whereIsActive(1)->take(3)->get() as $publication) {
            $publications[] = array_merge($publication->toArray(), [
                'author' => $publication->author->name,
                'publication_category' => $publication->publication_category->name,
            ]);
        }
        $partners = array_merge(Partner::where('photo', 'LIKE', '%min%')->whereIsActive(1)->get()->toArray(), Partner::where('photo', 'NOT LIKE', '%min%')->whereIsActive(1)->get()->toArray());
        $team = TeamMember::orderBy('id', 'DESC')->whereIsActive(1)->get();
        $all_services = Service::all();

        return response()->json([
            'testimonies' => $testimonies,
            'publications' => $publications,
            'partners' => $partners,
            'team' => $team,
            'all_services' => $all_services,
        ]);
    }

    public function about()
    {
        $team = TeamMember::orderBy('id', 'DESC')->whereIsActive(1)->get();

        return response()->json([
            'team' => $team,
        ]);
    }

    public function newsletter(Request $request)
    {
        $input = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:subscribers'
        ]);

        Subscriber::create($input);

        return response()->json([
            'message' => UtilController::message('Souscription réussie.', 'success'),
        ]);
    }

    public function quote(Request $request)
    {
        $request->validate([
            'services' => 'required|array|exists:services,id',
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'email' => 'required|email',
            'phone' => 'required|string',
            'location' => 'required|string',
            'address' => 'required|string',
            'message' => 'required|string',
        ]);

        $services = [];
        foreach ($request->services as $service_id) {
            $services[] = Service::find($service_id)->title[env('MIX_DEFAULT_LANG', 'fr')];
        }

        Notification::send(User::whereEmail('contact@hosamine.net')->first(), new QuoteNotification($request->except('services') + [
            'services' => $services,
        ]));

        return response()->json([
            'message' => UtilController::message('Formulaire soumis.', 'success'),
        ]);
    }

    public function contact(Request $request)
    {
        $request->validate([
            'name' => 'nullable|string',
            'email' => 'nullable|email',
            'message' => 'required|string',
        ]);

        Notification::send(User::whereEmail('contact@hosamine.net')->first(), new ContactNotification($request->all()));

        return response()->json([
            'message' => UtilController::message('Formulaire soumis.', 'success'),
        ]);
    }

    public function publications($publicationCategorySlug = null)
    {
        $page = +request()->page ?? 1;
        $show = request()->show ?? 12;
        $search = request()->search ?? '';

        $cms = UtilController::cms();

        $publications = [];
        $filteredData = Publication::orderBy('id')->where('publication_categories.is_active', 1);
        if ($publicationCategorySlug) {
            $publication_category = PublicationCategory::whereSlug($publicationCategorySlug)->first();
            if (!$publication_category) return response()->json([
                'message' => UtilController::message($cms['pages'][env('MIX_DEFAULT_LANG', 'fr')]['messages']['publication_categories']['not_found'], 'danger'),
            ]);

            $filteredData = $publication_category->publications()->orderBy('id')->where('publications.is_active', 1);
        }

        $filteredData = $filteredData
            ->join('users', function ($join) {
                $join->on('users.id', 'publications.author_id');
                $join->where('publications.author_type', '=', User::class);
            })
            ->join('publication_categories', 'publication_categories.id', '=', 'publications.publication_category_id')
            ->select('publications.*')
            ->when($search, function ($query, $search) {
                if ($search !== "")
                    $query
                        ->where('publications.title', 'LIKE', "%$search%")
                        ->orWhere('publications.body', 'LIKE', "%$search%")
                        ->orWhere('email', 'LIKE', "%$search%")
                        ->orWhere('name', 'LIKE', "%$search%")
                        ->orWhere('publications.photo', 'LIKE', "%$search%");
            });

        $total = $filteredData->count();

        if ($show !== 'All') $filteredData = $filteredData->skip(($page - 1) * $show)->take($show);

        $filteredData = $filteredData->get();

        foreach ($filteredData as $publication) {
            $publications[] = array_merge($publication->toArray(), [
                'author' => $publication->author->name,
            ]);
        }

        $recent_posts = Publication::orderBy('id', 'DESC')->whereIsActive(1)->take(5)->get();

        return response()->json([
            'publications' => $publications,
            'recent_posts' => $recent_posts,
        ]);
    }

    public function publication($publicationCategorySlug, $slug)
    {
        $cms = UtilController::cms();

        $publication_category = PublicationCategory::whereSlug($publicationCategorySlug)->where('publication_categories.is_active', 1)->first();
        if (!$publication_category) return response()->json([
            'message' => UtilController::message($cms['pages'][env('MIX_DEFAULT_LANG', 'fr')]['messages']['publication_categories']['not_found'], 'danger'),
        ]);

        $publication = $publication_category->publications()->where('publications.is_active', 1)->whereSlug($slug)->first();
        if (!$publication) return response()->json([
            'message' => UtilController::message($cms['pages'][env('MIX_DEFAULT_LANG', 'fr')]['messages']['publications']['not_found'], 'danger'),
        ]);
        $publication = array_merge($publication->toArray(), [
            'author' => $publication->author->name
        ]);

        $recent_posts = Publication::orderBy('id', 'DESC')->take(5)->get();

        return response()->json([
            'publication' => $publication,
            'recent_posts' => $recent_posts,
        ]);
    }

    public function services()
    {
        $page = +request()->page ?? 1;
        $show = request()->show ?? 12;
        $search = request()->search ?? '';

        $services = [];
        $filteredData = Service::orderBy('id')->whereIsActive(1);

        $filteredData = $filteredData
            ->select('services.*')
            ->when($search, function ($query, $search) {
                if ($search !== "")
                    $query
                        ->where('services.title', 'LIKE', "%$search%")
                        ->orWhere('services.body', 'LIKE', "%$search%")
                        ->orWhere('services.icon', 'LIKE', "%$search%");
            });

        $total = $filteredData->count();

        if ($show !== 'All') $filteredData = $filteredData->skip(($page - 1) * $show)->take($show);

        $filteredData = $filteredData->get();

        foreach ($filteredData as $service) {
            $services[] = array_merge($service->toArray(), []);
        }

        return response()->json([
            'services' => $services,
        ]);
    }

    public function service($slug)
    {
        $service = Service::whereSlug($slug)->whereIsActive(1)->first();

        if (!$service) return response()->json([
            'message' => UtilController::message('Service introuvable.', 'danger'),
        ]);

        return response()->json([
            'service' => $service,
        ]);
    }
}
