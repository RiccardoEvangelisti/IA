Sono chiamati giochi i problemi di ricerca con avversari.
Sono giochi a due giocatori, che chiameremo min e max, in cui le mosse sono alternate, e in cui alla fne ci saranno i risultati complementari *perde* o *vince*.
Sono giochi a conoscenza perfetta, cioè giochi in cui giocatori hanno la stessa informazione: quindi non rientrano in questa categoria, ad esempio, i giochi di carte.

Lo svolgersi del gioco è generalmente interpretato come un albero, in cui la radice è la posizione di partenza, mentre le foglie sono le posizioni finali (vincenti o perdenti).

Il primo livello dell'albero, corrisponde alle mosse possibili per il primo giocatore, mentre il secondo livello corrisponde a tutte le mosse possibili al secondo giocatore a partire dalla mossa fatta dal primo giocatore. E così via.

# Algoritmo min-MAX

E' progettato per determinare la strategia ottimale per MAX e per suggerirgli, di conseguenza, la prima mossa migliore da compiere; per fare questo, ipotizza che min faccia la scelta a lui più favorevole.

Per valutare un nodo $n$:
1) Espandi l'intero albero sotto $n$;
2) Valuta le foglie come vincenti per MAX o min;
3) Seleziona un nodo $n'$ senza etichetta i cui figli sono etichettati. Inizialmente saranno le foglie, poi il livello sopra, poi il livello ancora sopra, ecc. 
4) Se $n'$ è un nodo in cui deve muovere min, assegna ad esso il valore minimo dei figli. Se deve muovere MAX assegna il valore massimo dei figli. Ritorna a 3).

