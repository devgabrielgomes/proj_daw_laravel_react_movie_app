<?php

namespace App\Filters\V1;
use Illuminate\Http\Request;
use App\Filters\ApiFilter;

class ActorimageFilter extends ApiFilter{
    protected $allowedParms = [
        'id' => ['eq'],
        'idActor' => ['eq'],
        'photo' => ['eq'],
    ];

    protected $columnMap = [
        'idActor' => 'fk_id_actor'
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
