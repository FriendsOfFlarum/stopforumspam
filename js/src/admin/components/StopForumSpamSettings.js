import app from 'flarum/admin/app';
import ExtensionPage from 'flarum/admin/components/ExtensionPage';
import Link from 'flarum/common/components/Link';

export default class StopForumSpamSettings extends ExtensionPage {
    oninit(vnode) {
        super.oninit(vnode);
    }

    content() {
        const apiRegions = ['closest', 'europe', 'us'];
        const fofSpamblockEnabled = !!app.initializers.has('fof-spamblock');

        return [
            <div className="StopForumSpamSettings">
                <div className="container">
                    <div className="Form">
                        <div className="Introduction">
                            <p className="helpText">{app.translator.trans('fof-stopforumspam.admin.settings.introduction', {
                                a: <Link href="https://stopforumspam.com" target="_blank" external={true}/>
                            })}</p>
                        </div>
                        <hr />
                        {this.buildSettingComponent({
                            type: 'select',
                            setting: 'fof-stopforumspam.regionalEndpoint',
                            options: apiRegions.reduce((o, p) => {
                                o[p] = app.translator.trans(`fof-stopforumspam.admin.settings.region_${p}_label`);

                                return o;
                            }, {}),
                            label: app.translator.trans('fof-stopforumspam.admin.settings.regional_endpoint_label'),
                            help: app.translator.trans('fof-stopforumspam.admin.settings.regional_endpoint_help'),
                            default: 'closest',
                        })}
                        {this.buildSettingComponent({
                            type: 'boolean',
                            setting: 'fof-stopforumspam.username',
                            label: app.translator.trans('fof-stopforumspam.admin.settings.username_label'),
                            help: app.translator.trans('fof-stopforumspam.admin.settings.username_help'),
                        })}
                        {this.buildSettingComponent({
                            type: 'boolean',
                            setting: 'fof-stopforumspam.ip',
                            label: app.translator.trans('fof-stopforumspam.admin.settings.ip_label'),
                            help: app.translator.trans('fof-stopforumspam.admin.settings.ip_help'),
                        })}
                        {this.buildSettingComponent({
                            type: 'boolean',
                            setting: 'fof-stopforumspam.email',
                            label: app.translator.trans('fof-stopforumspam.admin.settings.email_label'),
                            help: app.translator.trans('fof-stopforumspam.admin.settings.email_help'),
                        })}
                        {this.buildSettingComponent({
                            type: 'boolean',
                            setting: 'fof-stopforumspam.emailhash',
                            label: app.translator.trans('fof-stopforumspam.admin.settings.email_hash_label'),
                            help: app.translator.trans('fof-stopforumspam.admin.settings.email_hash_help'),
                        })}
                        {this.buildSettingComponent({
                            type: 'number',
                            setting: 'fof-stopforumspam.frequency',
                            label: app.translator.trans('fof-stopforumspam.admin.settings.frequency_label'),
                            help: app.translator.trans('fof-stopforumspam.admin.settings.frequency_help'),
                            placeholder: '5',
                            required: true,
                        })}
                        {this.buildSettingComponent({
                            type: 'number',
                            setting: 'fof-stopforumspam.confidence',
                            label: app.translator.trans('fof-stopforumspam.admin.settings.confidence_label'),
                            help: app.translator.trans('fof-stopforumspam.admin.settings.confidence_help'),
                            min: 0,
                            max: 100,
                            placeholder: '50',
                            required: true,
                        })}
                        {fofSpamblockEnabled
                            ? [
                                  <hr />,
                                  <p className="helpText">{app.translator.trans('fof-stopforumspam.admin.settings.api_key_text')}</p>,
                                  this.buildSettingComponent({
                                      type: 'string',
                                      setting: 'fof-stopforumspam.api_key',
                                      label: app.translator.trans('fof-stopforumspam.admin.settings.api_key_label'),
                                      help: app.translator.trans('fof-stopforumspam.admin.settings.api_key_instructions_text', {
                                        register: <a href="https://www.stopforumspam.com/forum/register.php" />,
                                        key: <a href="https://www.stopforumspam.com/keys" />,
                                    })
                                  })
                              ]
                            : ''}
                        <hr />
                        {this.submitButton()}
                    </div>
                </div>
            </div>,
        ];
    }
}
