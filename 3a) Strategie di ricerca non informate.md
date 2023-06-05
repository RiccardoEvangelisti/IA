Una strategia non informata (detta **blind**) non usa alcuna conoscenza sul dominio: applica regole in modo arbitrario e fa una ricerca esaustiva. Impraticabile per problemi di una certa complessità.

Indico con:
- *d*: la profondità
- *b*: il fattore di ramificazione, ossia ogni nodo quanti figli genera
---
# Breadth-first
Espande sempre per primi i nodi meno profondi di un albero, esplorandolo in ampiezza.
L'esplorazione dell'albero avviene tenendo aperte CONTEMPORANEAMENTE più strade.
![[Pasted image 20230605124152.png]]

- [[2) Ricerca nello spazio degli stati#^completezza|Completezza]]: Sì, se *b* è finito
- [[2) Ricerca nello spazio degli stati#^complessita-temporale|Complessità temporale]]:
  Nel caso peggiore, $1 + b + b^2 + b^3 +…+(b^d – 1) \to b^d = O(b^d)$
  (all’ultimo livello sottraiamo 1 perché il goal non viene ulteriormente espanso)
- [[2) Ricerca nello spazio degli stati#^complessita-spaziale|Complessità spaziale]]: $O(b^d)$
- [[2) Ricerca nello spazio degli stati#^ottimalita|Ottimalità]]:
  Sì, se il costo coincide con la profondità.
  Altrimenti in generale No, perché è improbabile beccare il percorso migliore. Inoltre non permette una efficiente implementazione su sistemi mono-processore.

---
# Ricerca a costo uniforme
