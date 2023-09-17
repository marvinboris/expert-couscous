<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Controllers\UtilController;
use App\Models\Service;
use App\Models\Publication;
use App\Models\Subscriber;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Tracker;

class DashboardController extends Controller
{
    public function index()
    {
        $cms = UtilController::cms();
        $user = UtilController::get(request());

        $services = Service::count();
        $publications = Publication::count();
        $subscribers = Subscriber::count();

        $yearly_sessions = 0;

        $generalReport = [
            'sessions' => $yearly_sessions,
            'publications' => Publication::count(),
        ];

        $names = $cms['pages'][$user->language->abbr]['general']['months'];
        $totalSessions = [];
        $totalPublications = [];
        for ($i = 0; $i < 12; $i++) {
            $totalSessions[] = 0;
            $totalPublications[] = Publication::whereYear('created_at', now()->year)->whereMonth('created_at', $i + 1)->count();
        }
        for ($i = 0; $i < count($names); $i++) {
            $generalReportTrackerData[] = [
                'name' => strtoupper($names[$i]),
                'Sessions' => $totalSessions[$i],
                'Publications' => $totalPublications[$i],
            ];
        }

        return response()->json([
            'blocksData' => [
                'services' => $services,
                'publications' => $publications,
                'subscribers' => $subscribers,
            ],
            'generalReport' => $generalReport,
            'generalReportTrackerData' => $generalReportTrackerData,
        ]);
    }
}
