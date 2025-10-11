<?php

return [

    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'], // Permite todos os métodos HTTP

    'allowed_origins' => [
        'http://localhost:3000',  // Seu frontend React/Next.js
    ],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'], // Permite todos os headers

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true,  // MUITO IMPORTANTE para cookies funcionarem

];

