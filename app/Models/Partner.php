<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Partner extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'photo', 'is_active',
    ];

    protected $directory = '/images/partners/';

    public function getPhotoAttribute($value)
    {
        return $value ? $this->directory . $value : null;
    }
}
