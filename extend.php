<?php

/**
 *  This file is part of reflar/stopforumspam.
 *
 *  Copyright (c) 2018 .
 *
 *
 *  For the full copyright and license information, please view the LICENSE.md
 *  file that was distributed with this source code.
 */

namespace Reflar\Stopforumspam;

use Flarum\Extend\Frontend;
use Illuminate\Contracts\Events\Dispatcher;

return[
    (new Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js'),
     function (Dispatcher $events) {
        $events->subscribe(Listeners\AddMiddleware::class);
        $events->subscribe(Listeners\ReportSpammer::class);
    },
];
