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

Versione dell'algoritmo rivista per diminuire la complessità spaziale.
Per valutare un nodo $n$:
1) Metti in $L = (n)$ i nodi non ancora espansi.
2) Sia $x$ il primo nodo in $L$. 
	-  (ultimo passaggio) Se $x = n$ e vi è un valore $V_x$ assegnato ad esso, il procedimento termina con $n=V_x$.
	- ALTRIMENTI se $x$ ha un valore $V_x$ assegnato; sia $p$ il padre di $x$; sia $V_p$ il valore provvisorio assegnato a $p$. 
	  Se $p$ è un nodo *min*, $V_p= min(V_p,V_x)$.
	  Se $p$ è un nodo *MAX*, $V_p=max(V_p,V_x)$. 
	  Rimuovi $x$ da $L$ e torna allo step 2.
	- ALTRIMENTI se $x$ non ha assegnato alcun valore ED è un nodo terminale, assegna $V_x = 1 \lor -1 \lor 0$. 
	  Lascia $x$ in L perchè si dovranno aggiornare gli antenati.
	  Ritorna allo step 2. 
	- (primo passaggio) ALTRIMENTI se $x$ non ha assegnato alcun valore e NON è un nodo terminale, 
	  Se $x$ è un nodo *MAX*, $V_x = -infinito$
	  Se $x$ è un nodo *min*, $V_x = +infinito$. 
	  Aggiungi i figli di $x$ a $L$ *in testa*.
	  Ritorna allo step 2.

- [[2) Ricerca nello spazio degli stati#^completezza|Completezza]]: Sì
- [[2) Ricerca nello spazio degli stati#^complessita-temporale|Complessità temporale]]:  $O(b^{m})$ con [[3) Strategie di ricerca non informate#^m|m]]
- [[2) Ricerca nello spazio degli stati#^complessita-spaziale|Complessità spaziale]]:  $O(b m)$ con [[3) Strategie di ricerca non informate#^m|m]]
- [[2) Ricerca nello spazio degli stati#^ottimalita|Ottimalità]]: Sì, se l'avversario gioca al meglio