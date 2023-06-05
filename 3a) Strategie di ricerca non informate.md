Una strategia non informata (detta **blind**) non usa alcuna conoscenza sul dominio: applica regole in modo arbitrario e fa una ricerca esaustiva. Impraticabile per problemi di una certa complessità.

Indico con:
- *d*: la profondità
- *b*: il fattore di ramificazione, ossia ogni nodo quanti figli genera

# Breadth-first
Espande sempre per primi i nodi meno profondi di un albero, esplorandolo in ampiezza.

Nel caso peggiore, $1 + b + b^2 + b^3 +…+(b^d – 1) \to b$
(all’ultimo livello sottraiamo 1 perché il goal non viene ulteriormente espanso)
