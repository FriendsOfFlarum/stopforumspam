<?php

namespace FoF\StopForumSpam;

use Flarum\Extend;
use FoF\Spamblock\Event\MarkedUserAsSpammer;
use Illuminate\Contracts\Events\Dispatcher;

return[
    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js'),
    (new Extend\Locales(__DIR__.'/locale')),
    function (Dispatcher $events) {
        $events->listen(MarkedUserAsSpammer::class, Listeners\ReportSpammer::class);

        $events->subscribe(Listeners\AddMiddleware::class);
    },
];
