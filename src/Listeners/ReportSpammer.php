<?php

namespace Reflar\Stopforumspam\Listeners;

use Flarum\Post\Post;
use Flarum\Settings\SettingsRepositoryInterface;
use FoF\Spamblock\Event\MarkedUserAsSpammer;
use GuzzleHttp\Client as Guzzle;
use Illuminate\Contracts\Events\Dispatcher;

class ReportSpammer
{

    /**
     * Subscribes to the Flarum events.
     *
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events)
    {
        if (class_exists(MarkedUserAsSpammer::class)) {
            $events->listen(MarkedUserAsSpammer::class, [$this, 'report']);
        }
    }

    public function report(MarkedUserAsSpammer $event)
    {
        $apiKey = app(SettingsRepositoryInterface::class)->get('sfs.api_key');

        if ($apiKey) {
            $user = $event->user;

            $post = Post::where('user_id', $user->id)->first();

            $ipAddress = '8.8.8.8';

            if ($post) {
                $ip = $post->ip_address;
                if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE)) {
                    $ipAddress = $ip;
                }
            }

            $client = new Guzzle([
                'query' => [
                    'ip' => $ipAddress,
                    'email' => $user->email,
                    'username' => $user->username,
                    'api_key' => $apiKey
                ],
            ]);
            $client->request('GET', 'http://www.stopforumspam.com/add.php');
        }
    }
}