'use strict';

System.register('reflar/stopforumspam/components/StopForumSpamSettingsModal', ['flarum/components/SettingsModal', 'flarum/components/Switch'], function (_export, _context) {
    "use strict";

    var SettingsModal, Switch, StopForumSpamSettingsModal;
    return {
        setters: [function (_flarumComponentsSettingsModal) {
            SettingsModal = _flarumComponentsSettingsModal.default;
        }, function (_flarumComponentsSwitch) {
            Switch = _flarumComponentsSwitch.default;
        }],
        execute: function () {
            StopForumSpamSettingsModal = function (_SettingsModal) {
                babelHelpers.inherits(StopForumSpamSettingsModal, _SettingsModal);

                function StopForumSpamSettingsModal() {
                    babelHelpers.classCallCheck(this, StopForumSpamSettingsModal);
                    return babelHelpers.possibleConstructorReturn(this, (StopForumSpamSettingsModal.__proto__ || Object.getPrototypeOf(StopForumSpamSettingsModal)).apply(this, arguments));
                }

                babelHelpers.createClass(StopForumSpamSettingsModal, [{
                    key: 'className',
                    value: function className() {
                        return 'StopForumSpamSettingsModal Modal--small';
                    }
                }, {
                    key: 'title',
                    value: function title() {
                        return 'StopForumSpam Settings';
                    }
                }, {
                    key: 'form',
                    value: function form() {
                        return [m(
                            'div',
                            { className: 'Form-group' },
                            Switch.component({
                                state: this.setting('sfs.username', 0)(),
                                onchange: this.setting('sfs.username', 1),
                                children: 'Username spam check'
                            })
                        ), m(
                            'div',
                            { className: 'Form-group' },
                            Switch.component({
                                state: this.setting('sfs.ip', 0)(),
                                onchange: this.setting('sfs.ip', 1),
                                children: 'IP spam check'
                            })
                        ), m(
                            'div',
                            { className: 'Form-group' },
                            Switch.component({
                                state: this.setting('sfs.email', 0)(),
                                onchange: this.setting('sfs.email', 1),
                                children: 'Email spam check'
                            })
                        ), m(
                            'div',
                            { className: 'helpText' },
                            m(
                                'p',
                                null,
                                'This is the number of spam reports between all enabled checks that will trip the spam filter'
                            ),
                            m(
                                'p',
                                null,
                                'Ex: If the email has 1 hit, and the ip has 2 hits, there will be 3 hits in total. If the threshold is set to 3 or less it will prevent the registration.'
                            )
                        ), m(
                            'div',
                            { className: 'Form-group' },
                            m(
                                'label',
                                null,
                                'Threshold'
                            ),
                            m('input', { className: 'FormControl', bidi: this.setting('sfs.frequency') })
                        )];
                    }
                }]);
                return StopForumSpamSettingsModal;
            }(SettingsModal);

            _export('default', StopForumSpamSettingsModal);
        }
    };
});;
'use strict';

System.register('reflar/stopforumspam/main', ['flarum/app', './components/StopForumSpamSettingsModal'], function (_export, _context) {
    "use strict";

    var app, StopForumSpamSettingsModal;
    return {
        setters: [function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_componentsStopForumSpamSettingsModal) {
            StopForumSpamSettingsModal = _componentsStopForumSpamSettingsModal.default;
        }],
        execute: function () {

            app.initializers.add('reflar-stopforumspam', function () {
                app.extensionSettings['reflar-stopforumspam'] = function () {
                    return app.modal.show(new StopForumSpamSettingsModal());
                };
            });
        }
    };
});