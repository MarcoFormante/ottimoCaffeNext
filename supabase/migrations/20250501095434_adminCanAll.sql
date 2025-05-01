alter policy "admin can all"


on "public"."products"


to anon


using (


  true
)
with check (


  true

);