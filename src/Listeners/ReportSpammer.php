<?php

namespace FoF\StopForumSpam\Listeners;

use Flarum\Foundation\ValidationException;
use FoF\Spamblock\Event\MarkedUserAsSpammer;
use GuzzleHttp\Exception\RequestException;
use FoF\StopForumSpam\StopForumSpam;

class ReportSpammer
{
    /**
     * @var StopForumSpam
     */
    private $sfs;

    public function __construct(StopForumSpam $sfs)
    {
        $this->sfs = $sfs;
    }

    public function handle(MarkedUserAsSpammer $event)
    {
        if (!$this->sfs->isEnabled()) return;

        $user = $event->user;
        $post = $user->posts()->first();

        $ipAddress = '8.8.8.8';

        if ($post && filter_var($post->ip_address, FILTER_VALIDATE_IP, [FILTER_FLAG_IPV4, FILTER_FLAG_NO_PRIV_RANGE])) {
            $ipAddress = $post->ip_address;
        }

        try {
            $this->sfs->report([
                'ip' => $ipAddress,
                'username' => $user->username,
                'email' => $user->email,
            ]);
        } catch (RequestException $e) {
            throw new ValidationException([
                'sfs' => strip_tags(RequestException::getResponseBodySummary($e->getResponse())),
            ]);
        } catch (\Throwable $e) {
            throw new ValidationException([
                'sfs' => app('translator')->trans('fof-stopforumspam.api.error.unknown'),
            ]);
        }
    }
}
