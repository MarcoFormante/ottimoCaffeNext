create policy "admin can update"


on "public"."products"


to anon


using (

  true
)
with check (


  true

);