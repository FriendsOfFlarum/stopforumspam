import app from 'flarum/admin/app';

app.initializers.add('fof-stopforumspam', () => {
    let set = app.extensionData.for('fof-stopforumspam');

    set.registerSetting({
        label: app.translator.trans('fof-stopforumspam.admin.settings.username_label'),
        setting: 'fof-stopforumspam.username',
        type: 'boolean',
    })
        .registerSetting({
            label: app.translator.trans('fof-stopforumspam.admin.settings.ip_label'),
            setting: 'fof-stopforumspam.ip',
            type: 'boolean',
        })
        .registerSetting({
            label: app.translator.trans('fof-stopforumspam.admin.settings.email_label'),
            setting: 'fof-stopforumspam.email',
            type: 'boolean',
        })
        .registerSetting({
            label: app.translator.trans('fof-stopforumspam.admin.settings.frequency_label'),
            setting: 'fof-stopforumspam.frequency',
            type: 'number',
        })
        .registerSetting(function () {
            return <p>{app.translator.trans('fof-stopforumspam.admin.settings.frequency_text')}</p>;
        })
        .registerSetting(function () {
            return <p>{app.translator.trans('fof-stopforumspam.admin.settings.frequency_example_text')}</p>;
        });

    if (app.initializers.has('fof-spamblock')) {
        set.registerSetting(function () {
            return <h3>{app.translator.trans('fof-stopforumspam.admin.settings.api_key_text')}</h3>;
        })
            .registerSetting(function () {
                return (
                    <p>
                        {app.translator.trans('fof-stopforumspam.admin.settings.api_key_instructions_text', {
                            register: <a href="https://www.stopforumspam.com/forum/register.php" />,
                            key: <a href="https://www.stopforumspam.com/keys" />,
                        })}
                    </p>
                );
            })
            .registerSetting({
                label: app.translator.trans('fof-stopforumspam.admin.settings.api_key_label'),
                setting: 'fof-stopforumspam.api_key',
                type: 'string',
            });
    }
});
