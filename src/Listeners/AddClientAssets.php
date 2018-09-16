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

namespace Reflar\Stopforumspam\Listeners;

use Flarum\Frontend\Event\Rendering;
use Illuminate\Contracts\Events\Dispatcher;

class AddClientAssets
{

    /**
     * Subscribes to the Flarum events.
     *
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events)
    {
        $events->listen(Rendering::class, [$this, 'configureWebApp']);
    }
    
    /**
     * Modifies the client view for forum/admin.
     *
     * @param Rendering $event
     */
    public function configureWebApp(Rendering $event)
    {
        if ($event->isAdmin()) {
            $event->addAssets([
                __DIR__.'/../../js/admin/dist/extension.js',
                
            ]);
            $event->addBootstrapper('reflar/stopforumspam/main');
        }

        
    }
    
}
