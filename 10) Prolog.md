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

##### Regola di calcolo (Funzione di selezione)
Determina l'ordine nel quale gli atomi del goal devono essere selezionati e provati durante la risoluzione.
*Essa influenza solo l'efficienza, ossia la struttura dell'albero SDL sia in ampiezza sia in profondità. Non influenza né la correttezza né la completezza.*
In Prolog si selezionano i letterali **left-most** (da sinistra a destra).
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

###### Strategia di ricerca
Determina quale clausola del programma utilizzare in un passo di risoluzione.
Implica che possano esistere più soluzioni alternative per uno stesso goal.
In Prolog si adotta una strategia **depth-first (con backtracking)**. Nella scelta tra nodi fratelli, si segue l'ordine testuale delle clausole che li hanno generati. E' quindi **non completa**.


### Alberi SLD
- La radice è il goal G0, di profondità zero.
- Ogni nodo è un goal, generato da due soli parent, di cui uno è un goal del livello precedente, l'altro è una clausola unificabile con il primo parent.
- Ogni nodo ha tanti figli quante le clausole del programma con cui si può unificare.
- Ogni ramo che termina con il nodo vuoto ( ":-" ) rappresenta una derivazione SLD di successo.

###### Strategia di ricerca in alberi SDL
Nel caso di alberi SLD, attivare il "backtracking" implica che tutti i legami per le variabili determinati dal punto di backtracking in poi non devono essere più considerati (si scartano le sostituzioni).

---
# Interpretazione procedurale
Tutte le variabili sono a singolo assegnamento. Il loro valore è unico durante tutta la computazione e slegato solo quando si cerca una soluzione alternativa (“backtracking”).

---
# Negazione in Prolog
Attraverso la risoluzione SLD, non è possibile derivare informazioni negative.

###### Closed World Assumption(CWA)
Sia $A$ una formula e $T$, la CWA è la regola di inferenza tale per cui 
 $∼(T |= A)$  equivale a $∼A$
 cioè se A non è conseguenza logica della teoria, allora il suo negato fa parte della teoria, ossia se un fatto non è presente nella KB si assume che sia falso.
	In Prolog si traduce in: se fallisce la risoluzione SDL dell'atomo [[8a) Logica dei predicati del primo ordine (FOL)#Formule ground|ground]] $A$ nel programma $P$, allora è dimostrato vero $∼A$ (ossia $∼A$ fa parte di $P$).

###### Negation as Failure (NF)
E' la CWA ma applicata al solo insieme di fallimenti finiti.
	In Prolog si traduce in: se *fallisce finitamente* la risoluzione SDL dell'atomo [[8a) Logica dei predicati del primo ordine (FOL)#Formule ground|ground]] $A$ nel programma $P$, allora è dimostrato vero $∼A$ (ossia $∼A$ fa parte di $P$).

## Risoluzione SDLNF
Unisce la risoluzione SDL al Negation as Failure per risolvere goal che possono contenere letterali negativi.
Sia `:- L1,...,Lm` il goal (generale) corrente, in cui `L1, ..., Lm` sono letterali (atomi o negazioni di atomi). Un passo di risoluzione SLDNF si schematizza come segue: 
- Si seleziona il letterale `Li`
- Se Li è positivo, si compie un passo ordinario di risoluzione SLD
- Se Li è negativo, ma non [[8a) Logica dei predicati del primo ordine (FOL)#Formule ground|ground]], si scarta e si prosegue alla selezione del successivo.
- Se Li è negativo del tipo ~A (con A [[8a) Logica dei predicati del primo ordine (FOL)#Formule ground|ground]]) ed A fallisce finitamente (cioè ha un albero SLD di fallimento finito), `Li` ha successo e si ottiene il nuovo risolvente `:- L1, ..., Li-1, Li+1, ..., Lm`
  

Una regola di calcolo si dice **SAFE** se seleziona un letterale negativo solo quando è "ground”.


snippet di codice (3 volte Ctrl+Maiusc+C)
```run-prolog
cat(tom).

% query
cat(tom).
```
 