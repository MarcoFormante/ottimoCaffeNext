create policy "all users can see products"


on "public"."products"


as PERMISSIVE


for SELECT


to public


using (

true

);