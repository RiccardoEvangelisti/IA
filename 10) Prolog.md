Un programma Prolog è un insieme di clausole di Horn che rappresentano:
- **fatti**. Ciascuno è una clausola di horn composta da un solo atomo positivo (clausola definita):
  ```fatto(a).```
- **regole**. Ciascuna è [[8b) Logica dei predicati proposizionali#Clausole di Horn|una clausola di horn]] composta nella *testa* dall'atomo positivo e nel *corpo* da congiunzioni di atomi positivi:
  ```collega(X,Y) :- lavora(X,Z).```
- **goal**. E' una regola senza testa:
  ```:- collega(X,Y)```
  Il simbolo ```:-``` equivale al simbolo di implicazione. A :- B si traduce in "A se B".

# Esecuzione di un programma
Una computazione corrisponde al tentativo di dimostrare, tramite la [[8a) Logica dei predicati del primo ordine (FOL)#1. Principio di Risoluzione|risoluzione]], che una formula (la query, il goal, che contiene variabili) segue logicamente da un programma (KB), ossia dimostrare che è un teorema. Ciò che si vuole ottenere è la sostituzione, applicata durante la risoluzione, che assegna dei valori alle variabili del goal:
	Dato un programma P e la query: 
	```:- p(t1,t2,…,tm). ```
	se $X1,X2,…,Xn$ sono le variabili che compaiono in $t1,t2,…,tm$ il significato della query è: 
	$\exists X1,\exists X2,…,\exists Xn\ p(t1,t2,…,tm)$
	 e l’obiettivo è quello di trovare una sostituzione $s = {X1/s1,X2/s2,…,Xn/sn}$ dove $s_i$ sono termini tale per cui $P |= [p(t1,t2,…,tm)]s$
![[Pasted image 20230612155824.png]]

### Risoluzione SLD in Prolog
Dato un programma logico P (insieme di clausole definite) e una clausola goal $G_0$ (clausola Horn), ad ogni passo di risoluzione si ricava, se esiste, un nuovo risolvente $G_{i+1}$ ottenuto unificando la clausola goal del passo precedente $G_i$ e una *variante* di una clausola appartenente al programma P.
	Una *variante* per una clausola C è la clausola C’ ottenuta da C rinominando le sue variabili (**renaming**). Esempio: 
	```p(X) :- q(X,g(Z)). 
	p(X1) :- q(X1,g(Z1)).```
L'unificazione avviene attraverso la sostituzione più generale $\theta$ (mgu).

##### Funzione di selezione (regola di calcolo)
E' la regola che definisce l'ordine nel quale gli atomi del goal devono essere selezionati e provati durante la risoluzione.
In Prolog si selezionano i letterali da **da sinistra a destra**.
###### Prova di un goal
Un goal viene provato provando i singoli letterali.
Ogni letterale del goal viene provato unificandolo le clausole contenute nel programma: 
- se unifica con un fatto, allora la prova ha successo; 
- se unifica con la testa di una regola, ne viene provato il corpo, ossia si sostituisce il letterale del goal con il corpo della regola, applicando una sostituzione.
- se non unifica con niente, la prova fallisce.

###### Derivazione SDL
Una derivazione SLD per un goal G0 dall’insieme di clausole definite P è una sequenza di clausole goal G0,…Gn , una sequenza di varianti di clausole del programma C1, …Cn , e una sequenza di sostituzioni MGU q1 ,…, qn,  tali che Gi+1 è derivato da Gi e da Ci+1 attraverso la sostituzione qn.
Tre tipi di derivazioni:
- **di successo** (chiamata **==refutazione==**), *se per n finito ==Gn è uguale alla clausola vuota Gn = :-== *
- di **fallimento finito**: se per n finito non è più possibile derivare un nuovo risolvente da Gn e Gn non è uguale a :- 
- di **fallimento infinito**: se è sempre possibile derivare nuovi risolventi tutti diversi dalla clausola vuota.

###### Legami per le variabili del goal
Sono ottenuti componendo le sostituzioni MGU applicate durante la risoluzione.
Dato un programma logico P e un goal G0, una **risposta** per $P\cup {G0}$ è una sostituzione per le variabili di G0.
Si consideri una refutazione SLD per $P\cup {G0}$. Una **risposta calcolata** q è la sostituzione ottenuta restringendo la composizione delle sostituzioni mgu q1,...,qn alle variabili di G0 (cioè prendere solo le sostituzioni che contengono variabili contenute nel goal).


snippet di codice (3 volte Ctrl+Maiusc+C)
```run-prolog
cat(tom).

% query
cat(tom).
```
 