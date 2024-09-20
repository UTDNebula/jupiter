select distinct UNNEST(tags) as tags,
count(tags)
from
club
group by unnest(tags)
order by count desc
