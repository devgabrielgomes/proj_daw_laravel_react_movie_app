<?php

namespace App\Filters\V1;
use Illuminate\Http\Request;
use App\Filters\ApiFilter;

class MovieFilter extends ApiFilter{
    protected $allowedParms = [
        'id' => ['eq'],
        'title' => ['eq', 'like'],
        'year' => ['eq'],
        'rating' => ['eq'],
        'synopsis' => ['eq'],
        'trailer' => ['eq'],
        'runtime' => ['eq']
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
