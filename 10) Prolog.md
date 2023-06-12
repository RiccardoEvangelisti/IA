Un programma Prolog è un insieme di clausole di Horn che rappresentano:
- **fatti**. Ciascuno è una clausola di horn composta da un solo atomo positivo:
  ```fatto(a).```
- **regole**. Ciascuna è [[8b) Logica dei predicati proposizionali#Clausole di Horn|una clausola di horn]] composta nella *testa* dall'atomo positivo e nel *corpo* da congiunzioni di atomi positivi:
  ```collega(X,Y) :- lavora(X,Z).```
- **goal**. E' una regola senza testa:
  ```:- collega(X,Y)```
  Il simbolo ```:-``` equivale al simbolo di implicazione. A :- B si traduce in "A se B".

###### Esecuzione di un programma
Una computazione corrisponde al tentativo di dimostrare, tramite la [[8a) Logica dei predicati del primo ordine (FOL)#1. Principio di Risoluzione|risoluzione]], che una formula (il goal) segue logicamente da un programma (KB), ossia dimostrare che è un teorema.

###### Prova di un goal
Un goal viene provato provando i singoli letterali **da sinistra a destra**, ciascuno dei quali viene provato unificandolo con le teste delle clausole contenute nel programma: se unifica con un fatto, allora la prova ha successo; se unifica con una regola, ne viene provato il corpo; se non unifica, la prova fallisce.

snippet di codice (3 volte Ctrl+Maiusc+C)
```run-prolog
cat(tom).

% query
cat(tom).
```
 