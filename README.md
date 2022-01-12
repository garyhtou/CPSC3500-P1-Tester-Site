# CPSC 3500 Project 1 Tester

This crudely scraped together website helps compare command line utility _ouputs_ for Project 1.

It's built with Next.js + Chakra and pings an API server. That server runs my utilities and returns the results as JSON.

On deployment of that server, my C++ code is compiled (via Docker and Make) and made available to a Node.js Express server.
The code for that server is private since it contains my C++ code for this assignment. It could be public once/if I spend
some time removing the assignment code from the repo, and set up secure fetching
of the code from a private github repo or server during deployment.

### About Project 1

Recreate classic UNIX utilities:

- `cat`: `wcat`
- `grep`: `wgrep`
- `zip`: `wzip`
- `unzip`: `wunzip`
