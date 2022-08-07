<?php

namespace App\Models;

use App\Http\Controllers\UtilController;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Cviebrock\EloquentSluggable\Sluggable;

class Service extends Model
{
    use HasFactory, Sluggable;

    public function sluggable(): array
    {
        return [
            'slug' => [
                'source' => 'stringified'
            ]
        ];
    }

    protected $fillable = [
        'title', 'body', 'icon', 'photos', 'slug', 'is_active',
    ];

    protected $appends = [
        'link', 'stringified',
    ];

    protected $directory = '/images/services/';

    public function getTitleAttribute($value)
    {
        return UtilController::translatable($value);
    }

    public function getBodyAttribute($value)
    {
        return UtilController::translatable($value);
    }

    public function getStringifiedAttribute()
    {
        return $this->title[env('MIX_DEFAULT_LANG', 'fr')];
    }

    public function getPhotosAttribute($value)
    {
        return $value ? array_map(function ($photo) {
            return $this->directory . $photo;
        }, json_decode($value)) : [];
    }

    public function getLinkAttribute()
    {
        return '/services/' . $this->slug;
    }
}
