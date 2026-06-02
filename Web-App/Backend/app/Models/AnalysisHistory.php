<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AnalysisHistory extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'analysis_result' => 'array',
        'completed_skills' => 'array',
        'current_skills' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
