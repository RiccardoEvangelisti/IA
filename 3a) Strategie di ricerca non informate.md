Una strategia non informata (detta **blind**) non usa alcuna conoscenza sul dominio: applica regole in modo arbitrario e fa una ricerca esaustiva. Impraticabile per problemi di una certa complessità.

Indico con:
- *d*: la profondità
- *b*: il fattore di ramificazione, ossia ogni nodo quanti figli genera
---
# Breadth-first
Espande sempre per primi i nodi meno profondi di un albero, esplorandolo in ampiezza. I nuovi nodi vengono semplicemente inseriti al termine della coda.
L'esplorazione dell'albero avviene tenendo aperte CONTEMPORANEAMENTE più strade.
![[Pasted image 20230605124152.png]]

- [[2) Ricerca nello spazio degli stati#^completezza|Completezza]]: Sì, se *b* è finito
- [[2) Ricerca nello spazio degli stati#^complessita-temporale|Complessità temporale]]:
  Nel caso peggiore, $1 + b + b^2 + b^3 +…+(b^d – 1) \to b^d = O(b^d)$
  (all’ultimo livello sottraiamo 1 perché il goal non viene ulteriormente espanso)
- [[2) Ricerca nello spazio degli stati#^complessita-spaziale|Complessità spaziale]]: uguale alla temporale
- [[2) Ricerca nello spazio degli stati#^ottimalita|Ottimalità]]:
  Sì, se il costo coincide con la profondità.
  Altrimenti in generale No, perché è improbabile beccare il percorso migliore. Inoltre non permette una efficiente implementazione su sistemi mono-processore.

---
# Uniform Cost Search (Ricerca a costo uniforme)
Si tratta di una ricerca in ampiezza nella quale i nodi sono inseriti in una coda ordinata, in modo che venga estratto il nodo con costo minore dal nodo di partenza, ossia i nodi sono in ordine di costo di cammino crescente.
Si usa al posto della BFS quando si hanno archi di costo non unitario e quando i costi sono non decrescenti in profondità.

- [[2) Ricerca nello spazio degli stati#^completezza|Completezza]]: Sì, se *b* è finito
- [[2) Ricerca nello spazio degli stati#^complessita-temporale|Complessità temporale]]:
  $O(b^{1+C^*/\epsilon})$
  con $C^*$ il costo totale della soluzione ottimale
  e con $\epsilon$ il minimo costo di un arco.
- [[2) Ricerca nello spazio degli stati#^complessita-spaziale|Complessità spaziale]]: uguale alla temporale
- [[2) Ricerca nello spazio degli stati#^ottimalita|Ottimalità]]:
  Sì, perchè la prima volta che verrà espanso il nodo di arrivo la sua distanza dal nodo di partenza sarà minore di o uguale a quella di qualunque altro nodo in coda.

