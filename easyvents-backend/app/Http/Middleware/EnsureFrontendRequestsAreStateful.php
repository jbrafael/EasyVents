<?php

namespace App\Http\Middleware;

use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful as SanctumMiddleware;

class EnsureFrontendRequestsAreStateful extends SanctumMiddleware
{
    /**
     * The URIs that should be considered for stateful authentication.
     *
     * @var array
     */
    protected static $hosts = [
        'localhost:3000',
        '127.0.0.1:8000',
    ];
}
