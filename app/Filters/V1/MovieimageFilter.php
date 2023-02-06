<?php

namespace App\Filters\V1;
use Illuminate\Http\Request;
use App\Filters\ApiFilter;

class MovieimageFilter extends ApiFilter{
    protected $allowedParms = [
        'id' => ['eq'],
        'idMovie' => ['eq'],
        'cover' => ['eq', 'like'],
        'background' => ['eq', 'like']
    ];

    protected $columnMap = [
        'idMovie' => 'fk_id_movie'
    ];

    protected $operatorMap = [
        'eq' => '=',
        'lt' => '<',
        'lte' => '<=',
        'gt' => '>',
        'gte' => '>=',
        'like' => 'like',
    ];
}
