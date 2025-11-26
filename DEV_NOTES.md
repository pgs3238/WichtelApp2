## ⚠️ Development Status

### SQL tables
| Table          | Status                  | Name                        |
|:---------------|:------------------------|:----------------------------|
| User           | implemented             | wichtel_user                |
| Unknown User   | not yet implemented     |                             |
| Event          | implemented             | wichtel_event               |
| User Login     | implemented             | user_roles                  |
| Event Owner    | implemented             | wichtel_event_wichtel_user1 |
| User exclusion | implemented             | user_event_exclusion        |
| Event partner  | implemented (unchecked) | event_partner               |

### Backend
| Area                    | Status                           |
|:------------------------|:---------------------------------|
| Login                   | implemented                      |
| User management         | implemented                      |
| Event Setup             | implemented                      |
| Secret Santa assignment | theoretically complete, untested |
| Email notification      | planned                          |

### Frontend
| Area                        | Status                                                           |
|:----------------------------|:-----------------------------------------------------------------|
| Landing Page                | implemented and functional                                       |
| Login                       | Integrated into *Landing Page* (⚠️logout sometimes returns here) |
| User creation               | implemented and functional                                       |
| Event creation              | implemented and functional                                       |
| Display events page         | implemented and functional                                       |
| My Events page              | implemented and partially functional                             |
| Display Users in Event Page | Integrated into *My Events Page*                                 |
| Add Users to Event Page     | Integrated into *My Events Page*                                 |
| Group Main Page             | removed                                                          |
| Add/Remove Groups Page      | removed; new function will be added to *My Events Page*          |
| Add Users to Groups Page    | removed; new function will be added to *My Events Page*          |

> ⚠️ Note: Not all buttons are functional. Table entries are test data used for analyzing and debugging.

### Completed / Deprecated
- ~~Implement table in *Display Events* page~~
- ~~Modify layout of *User Creation* page~~
- ~~Implement table in *My Events* page; add scroll function to limit table size to six lines~~
- ~~Implement table from *Display Users in Event* page within *My Events* page; table should populate with data when an event is selected~~
- ~~Implement functionality from *Add Users to Event* page in *My Events* page, to add users to an event;~~ connect frontend with backend and make entry functional
- ~~Modified backend joined table Event + User: now a joined table with dual key (event, user), and an additional entry indicating whether an email was sent~~
- ~~Modified backend to make the new Event + User table usable in frontend - (wichtel_event_wichtel_user1)~~
- ~~Modified backend, created new table to replace subgroups (user_event_exclusions)~~
- Add a new function to replace groups. (untested)
- deprecated joined table Event + User (wichtel_event_wichtel_user)is still active but no longer used
- deprecated table - (wichtel_event_wichtel_subgruppe) is still active but no longer used
- deprecated table - (wichtel_subgruppe) is still active but no longer used
- deprecated table - (wichtel_subgruppe_wichtel_user) is still active but no longer used
- deprecated *Login* page (+CSS) still active
- deprecated *Display Users in Event* page (+CSS) still active
- deprecated *Add Users to Event* page (+CSS) still active
- deprecated *Group Main* page (+CSS) still active
- deprecated *Add/Remove Groups* page (+CSS) still active
- deprecated *Add Users to Groups* page (+CSS) still active
> ⚠️ Deprecated pages and tables remain in place until replacement features are fully tested and verified to maintain application stability.

### Upcoming / Next Steps

- Add a backend table for users without accounts (contains email address). When a user creates an account, this data merges with the main User table and the user-event table.
- Test adding users and new function with multiple test users.
- Rewrite Secret Santa function for the new groups replacement and test it.
- Update Quarkus to 3.x and fix broken functionality (email and updated cookie require Quarkus 3.x).
- Add email service: invites sent via email; users must accept in the app. Email is primary key.
- Test all email functionality; possibly add more email features.
- Fix cookie issue.
- Modify taskbar: consider moving link to event creation to top menu and add logout to top menu; remove logout button from bottom or keep both.
- Improve frontend styling.
- Finish the app

### Note to self - Missing in implementation
- Add a “hook” to indicate whether the creator wants to participate in their own event. At the moment, the creator must manually add themselves to the event after it’s created, rather than having a “participate” option.