import { settings } from '@fof-components';

const {
    SettingsModal,
    items: { StringItem, BooleanItem, NumberItem },
} = settings;

app.initializers.add('fof-stopforumspam', () => {
    app.extensionSettings['fof-stopforumspam'] = () =>
        app.modal.show(
            new SettingsModal({
                title: app.translator.trans('fof-stopforumspam.admin.settings.title'),
                size: 'medium',
                items: [
                    <BooleanItem key="fof-stopforumspam.username">
                        {app.translator.trans('fof-stopforumspam.admin.settings.username_label')}
                    </BooleanItem>,
                    <BooleanItem key="fof-stopforumspam.ip">{app.translator.trans('fof-stopforumspam.admin.settings.ip_label')}</BooleanItem>,
                    <BooleanItem key="fof-stopforumspam.email">{app.translator.trans('fof-stopforumspam.admin.settings.email_label')}</BooleanItem>,
                    <div className="Form-group">
                        <label>{app.translator.trans('fof-stopforumspam.admin.settings.frequency_label')}</label>
                        <NumberItem key="fof-stopforumspam.frequency" simple />
                        <br />
                        <p className="helpText">
                            {app.translator.trans('fof-stopforumspam.admin.settings.frequency_text')} <br />
                            {app.translator.trans('fof-stopforumspam.admin.settings.frequency_example_text')}
                        </p>
                    </div>,
                    app.initializers.has('fof-spamblock') ? (
                        <div className="Form-group">
                            <label>{app.translator.trans('fof-stopforumspam.admin.settings.api_key_label')}</label>
                            <StringItem key="fof-stopforumspam.api_key" simple />
                            <br />
                            <p className="helpText">
                                {app.translator.trans('fof-stopforumspam.admin.settings.api_key_text')} <br />
                                {app.translator.trans('fof-stopforumspam.admin.settings.api_key_instructions_text', {
                                    register: <a href="https://www.stopforumspam.com/forum/register.php" />,
                                    key: <a href="https://www.stopforumspam.com/keys" />,
                                })}
                            </p>
                        </div>
                    ) : (
                        []
                    ),
                ],
            })
        );
});
