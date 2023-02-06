<?php

namespace App\Filters\V1;
use Illuminate\Http\Request;
use App\Filters\ApiFilter;

class MoviegenreFilter extends ApiFilter{
    protected $allowedParms = [
        'id' => ['eq'],
        'idMovie' => ['eq'],
        'idGenre' => ['eq'],
    ];

    protected $columnMap = [
        'idMovie' => 'fk_id_movie',
        'idGenre' => 'fk_id_genre',
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
