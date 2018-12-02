<?php

namespace Reflar\Stopforumspam\middleware;

use Flarum\Api\Handler\IlluminateValidationExceptionHandler;
use Flarum\Api\JsonApiResponse;
use Flarum\Settings\SettingsRepositoryInterface;
use GuzzleHttp\Client as Guzzle;
use Illuminate\Contracts\Validation\ValidationException;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use Tobscure\JsonApi\Exception\Handler\ResponseBag;
use Zend\Diactoros\Uri;

class RegisterMiddleware implements MiddlewareInterface
{
    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface
    {
        $registerUri = new Uri(app()->url('/register'));
        if ($request->getUri()->getPath() === $registerUri->getPath()) {

            $data = $request->getParsedBody();
            $serverParams = $request->getServerParams();

            if (isset($serverParams['HTTP_CF_CONNECTING_IP'])) {
                $ipAddress = $serverParams['HTTP_CF_CONNECTING_IP'];
            } else {
                $ipAddress = $serverParams['REMOTE_ADDR'];
            }

            $settings = app(SettingsRepositoryInterface::class);

            $client = new Guzzle([
                'query' => [
                    'f' => 'json',
                    'ip' => $ipAddress,
                    'email' => $data['email'],
                    'username' => $data['username'],
                ],
            ]);
            $response = $client->request('GET', 'http://api.stopforumspam.org/api');
            $body = json_decode($response->getBody());

            if ($body->success === 1) {
                unset($body->success);
                $frequency = 0;
                foreach ($body as $key => $value) {
                    if ($settings->get("sfs.$key") === '1') {
                        $frequency += $value->frequency;
                    }
                }

                if ($frequency !== 0 && $frequency >= (int)$settings->get('sfs.frequency')) {
                    $error = new ResponseBag('422', [
                        [
                            'status' => '422',
                            'code' => 'validation_error',
                            'source' => [
                                'pointer' => '/data/attributes/username'
                            ],
                            'detail' => 'Your info has been flagged as spam'
                        ]
                    ]);

                    $document = new Document();
                    $document->setErrors($error->getErrors());
                    return new JsonApiResponse($document, $error->getStatus());
                }
            }
        }

        return $handler->handle($request);
    }
}
