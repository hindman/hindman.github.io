
-- Given a user email, select their app_state JSON along
-- with a derived tally of the N of videos.

select
  au.email,
  jsonb_array_length(u.app_state -> 'videos') as video_count,
  u.app_state
from users as u
join auth.users as au on au.id = u.id
where au.email = '__USER_EMAIL__';

