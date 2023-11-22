# TODO
- Variable pathname matching (path params)
- Method matching (Method.match(() => handleGet, () => handlePost))

# Improvements
1. Nothing forces you to actually register schemas with the app, so "valid" anchors might not be served
2. Nothing forces you to consume all form inputs, you could omit a field (maybe this is good)
3. Work for any jsx provider (lit, preact, etc)