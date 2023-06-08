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

###### Versione rivista per diminuire la complessità spaziale.
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


> [!Algoritmo min-MAX]
> Concretamente:
> - Nei nodi di MAX si pone $-infinito$
> - Nei nodi di min si pone $+infinito$
> - Partendo dalle foglie,
>   Se il nodo padre è min, si seleziona il minimo tra il padre e la foglia
>   Se il nodo padre è MAX, si selezionoa il massimo tra il padre e la foglia
> - Poi si sale di un livello, ripetendo il passo precedente


###### Versione rivista per diminuire la complessità temporale
La soluzione (Shannon, 1949): si guarda avanti solo per un po' e si valutano le mosse fino ad un nodo non terminale ritenuto di successo. In pratica si applica minimax fino ad una certa profondità. Utilizzo una certa funzione di valutazione per stimare la bontà di un certo nodo:
- e(n) = -1 sicuramente vincente per min; 
- e(n) = +1 sicuramente vincente per max; 
- e(n) = 0 circa le stesse probabilità

Per valutare un nodo $n$:
1) Metti in $L = (n)$ i nodi non ancora espansi.
2) Sia $x$ il primo nodo in $L$. 
	-  (ultimo passaggio) Se $x = n$ e vi è un valore $V_x$ assegnato ad esso, il procedimento termina con $n=V_x$.
	- ALTRIMENTI se $x$ ha un valore $V_x$ assegnato; sia $p$ il padre di $x$; sia $V_p$ il valore provvisorio assegnato a $p$. 
	  Se $p$ è un nodo *min*, $V_p= min(V_p,V_x)$.
	  Se $p$ è un nodo *MAX*, $V_p=max(V_p,V_x)$. 
	  Rimuovi $x$ da $L$ e torna allo step 2.
	- ALTRIMENTI se $x$ non ha assegnato alcun valore ED è un nodo terminale, **OPPURE decidiamo di non espandere l'albero ulteriormente, assegnagli il valore utilizzando la funzione di valutazione e(x).**
	  Lascia $x$ in L perchè si dovranno aggiornare gli antenati.
	  Ritorna allo step 2. 
	- (primo passaggio) ALTRIMENTI se $x$ non ha assegnato alcun valore e NON è un nodo terminale, 
	  Se $x$ è un nodo *MAX*, $V_x = -infinito$
	  Se $x$ è un nodo *min*, $V_x = +infinito$. 
	  Aggiungi i figli di $x$ a $L$ *in testa*.
	  Ritorna allo step 2.

Come decido che non voglio espandere ulteriormente l'albero?
Nota: se e(n) fosse perfetta non avrei questo problema. Espanderei solo i figli della radice per decidere cosa fare.
L'algoritmo considera anche mosse e nodi che non si verificheranno mai. Per ridurre lo spazio di ricerca si utilizzano i [[#Tagli Alfa-Beta]].

# Tagli Alfa-Beta
Si consideri un nodo N nell’albero. Il giocatore si muoverà verso quel nodo? Se il giocatore ha una scelta migliore (ALFA) in un qualunque punto di scelta precedente, N non sarà mai selezionato. Se raggiungiamo questa conclusione possiamo eliminare N.

> [!Tagli ALFA-BETA]
> - Si genera l'albero depth-first, left-to-right
> - Si propagano i valori (stimati) a partire dalle foglie
> - Siano **ALFA $\ge$** i (temporanei) valori nei nodi MAX ^alfa
> - Siano **BETA $\le$** i (temporanei) valori nei nodi min ^beta
> - **Se un ALFA è maggiore-uguale di un BETA di un nodo discendente**: stop alla generazione di figli del discendente!
> - **Se un BETA è minore-uguale ad un ALFA di un nodo discendente**: stop alla generazione dei figli del discendente!

![[Pasted image 20230608105058.png]]


Per valutare un nodo $n$:
1) Metti in $L = (n)$ i nodi non ancora espansi.
2) Sia $x$ il primo nodo in $L$. 
	-  (ultimo passaggio) Se $x = n$ e vi è un valore $V_x$ assegnato ad esso, il procedimento termina con $n=V_x$.
	- ALTRIMENTI se $x$ ha un valore $V_x$ assegnato; sia $p$ il padre di $x$; sia $V_p$ il valore provvisorio assegnato a $p$.
		- Determiniamo se p ed i suoi figli possono essere eliminati dall'albero. Se $p$ è un nodo min, sia ALFA il massimo di tutti i correnti valori assegnati ai fratelli di p e dei nodi min che sono antenati di p.
		- Se non ci sono questi valori $ALFA = -infinito$.
		- Se $V_x \le ALFA$ rimuovi $p$ e tutti i suoi discendenti da L (dualmente se $p$ è un MAX).
	- ALTRIMENTI se $p$ non può essere eliminato, 
	  Se $p$ è un nodo *min*, $V_p= min(V_p,V_x)$.
	  Se $p$ è un nodo *MAX*, $V_p=max(V_p,V_x)$. 
	  Rimuovi $x$ da $L$ e torna allo step 2.
	-  ALTRIMENTI se $x$ non ha assegnato alcun valore ED è un nodo terminale, **OPPURE decidiamo di non espandere l'albero ulteriormente, assegnagli il valore utilizzando la funzione di valutazione e(x).**
	  Lascia $x$ in L perchè si dovranno aggiornare gli antenati.
	  Ritorna allo step 2. 
	- (primo passaggio) ALTRIMENTI se $x$ non ha assegnato alcun valore e NON è un nodo terminale, 
	  Se $x$ è un nodo *MAX*, $V_x = -infinito$
	  Se $x$ è un nodo *min*, $V_x = +infinito$. 
	  Aggiungi i figli di $x$ a $L$ *in testa*.
	  Ritorna allo step 2.