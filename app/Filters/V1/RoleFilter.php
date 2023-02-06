<?php

namespace App\Filters\V1;
use Illuminate\Http\Request;
use App\Filters\ApiFilter;

class RoleFilter extends ApiFilter{
    protected $allowedParms = [
        'id' => ['eq'],
        'idMovie' => ['eq'],
        'idActor' => ['eq'],
        'name' => ['eq'],
    ];

    protected $columnMap = [
        'idMovie' => 'fk_id_movie',
        'idActor' => 'fk_id_actor',
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
