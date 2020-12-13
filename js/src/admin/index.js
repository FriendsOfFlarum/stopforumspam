import app from 'flarum/app';

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
        .registerSetting({
            label: app.translator.trans('fof-stopforumspam.admin.settings.frequency_text'),
            setting: 'fof-stopforumspam.hidden_label1',
            type: 'hidden',
        })
        .registerSetting({
            label: app.translator.trans('fof-stopforumspam.admin.settings.frequency_example_text'),
            setting: 'fof-stopforumspam.hidden_label2',
            type: 'hidden',
        });

    if (app.initializers.has('fof-spamblock')) {
        set.registerSetting({
            label: app.translator.trans('fof-stopforumspam.admin.settings.api_key_label'),
            setting: 'fof-stopforumspam.api_key',
            type: 'string',
        })
            .registerSetting({
                label: app.translator.trans('fof-stopforumspam.admin.settings.api_key_text'),
                setting: 'fof-stopforumspam.hidden_label3',
                type: 'hidden',
            })
            .registerSetting({
                label: app.translator.trans('fof-stopforumspam.admin.settings.api_key_instructions_text', {
                    register: <a href="https://www.stopforumspam.com/forum/register.php" />,
                    key: <a href="https://www.stopforumspam.com/keys" />,
                }),
                setting: 'fof-stopforumspam.hidden_label4',
                type: 'hidden',
            });
    }
});
