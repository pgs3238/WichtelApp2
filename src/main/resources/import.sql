-- This file allow to write SQL commands that will be emitted in test and dev.
-- The commands are commented as their support depends of the database
-- insert into myentity (id, field) values(nextval('hibernate_sequence'), 'field-1');
-- insert into myentity (id, field) values(nextval('hibernate_sequence'), 'field-2');
-- insert into myentity (id, field) values(nextval('hibernate_sequence'), 'field-3');
INSERT INTO wichtel_user (email, name, password, vorname) VALUES ('danield@entenhausen.de', 'Duesentrieb', '$2a$10$JmYdquLaQO5ejpxsa9Fxg.NYuAcZz3f.YSEMdL6d6ZP27un3PSMJO', 'Daniel');
INSERT INTO user_roles (user_email, roles) VALUES ('danield@entenhausen.de', 'user');
-- passwort: 12345

INSERT INTO wichtel_user (email, name, password, vorname) VALUES ('doduck@entenhausen.de', 'Duck', '$2a$10$pWeBuWHLA6ilqQq4b3JXc.AU8QmsaxMsd6.svvmVv9oXzZd6fTry.', 'Donald');
INSERT INTO public.user_roles (user_email, roles) VALUES ('doduck@entenhausen.de', 'user');


