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

## Variabili write-once
*Tutte le variabili sono a singolo assegnamento (write-once). Il loro valore è unico durante tutta la computazione e slegato solo quando si cerca una soluzione alternativa (“backtracking”).*
`:- X is 2+3, X is X+1`   -> NO, BISOGNA ISTANZIARE UNA NUOVA VARIABILE

###### ``atomic(T)
Vero se T è un atomo o un numero (cioè non un predicato)
###### ``atom(T)
Vero se T è un atomo non numerico
###### ``number(T)
Vero se T è un numero intero o reale
###### ``integer(T)
Vero se T è un numero intero
###### ``var(T)
Vero se T è una variabile non istanziata
###### ``nonvar(T)
Vero se T non è una variabile

###### Operatori
Per gli operatori aritmetici binari il Prolog consente tanto una notazione prefissa (funzionale), quanto la più tradizionale notazione infissa: +(2,3) e 2+3 sono due rappresentazioni equivalenti. Inoltre, 2+3\*5 viene interpretata correttamente come 2+(3\*5).
+, -, \*, \
<, >, >=, =<
**\==**, **=/=**    (uguaglianza e disuguaglianza)
Vengono valutate prima le espressioni prima e dopo l'operatore, poi viene applicato l'operatore.

###### Predicato `is`
`T is Expr`
- `T` può essere un numero o variabile.
- `Expr` DEVE ESSERE ISTANZIATA, ossia NO VARIABILI, al momento della valutazione.
Viene valutata `Expr`, poi il risultato viene unificato con `T`.

![[Pasted image 20230613111752.png|500]]


## Ricorsione tail
Una funzione f è definita per ricorsione tail se f è, oltre ad essere in testa alla regola, è la "più a destra" nel body. In altri termini, se sul risultato della chiamata ricorsiva di f non vengono effettuate ulteriori operazioni.
- Riduce la crescita dello stack rispetto alla ricorsione non tail. Fa sì che, quando abbiamo una chiamata, il nuovo record di attivazione lo allochiamo direttamente su quello precedente e non abbiamo una crescita lineare sulle chiamate.
- *Ottimizzazione della ricorsione tail*:  buona prassi mettere chiamate ricorsive sempre per ultime nella lista delle clausole. In questo modo quando viene chiamata la ricorsione non ci sono punti di scelta precedenti perché appunto è l'ultima clausola. Quindi la chiamata può essere allocata sul record di attivazione precedente.

## Liste
- [\ ] lista vuota
- [ T | C] , T è la testa, C è la coda

| | |
|-- | -- |
| \[ a \| [] ] | [a] |
| \[ a \| \[ b,c ] ] | [a,b,c] |
| \[ a \| \[ b \| []] ] | [a,b] |
| [ \[] \| \[] ] | [ [] ] |
| [ \[ a \| \[] ] \| \[ b \| \[] ] ] | [ [a],b ] |

###### ``is_list(T)
Per verificare se un termine è una lista
###### ``member(T,L)
Per verificare l'appartenenza di T nella lista L, se T costante
Oppure per individuare gli elementi della lista L, se T variabile.
###### ``last(L,X)
Per individuare l'ultimo elemento nella lista L data la variabile X.
###### ``length(L,N)
Per determinare in N la lunghezza della lista L.
###### ``append(L1,L2,L3)
Per appendere L1 a L2 e salvarle in L3.
###### ``delete(El, L, L1)
Per cancellare l'elemento El dalla lista L, e ritornare la lista risultante in L1.
###### ``reverse(L,Lr)
Per invertire la lista L, e ritornare la lista invertita in Lr.
###### ``intersection(S1,S2,S3)
Per salvare in S3 la lista data dall'intersezione tra le liste S1 e S2 che contengono valori SENZA RIPETIZIONI.
###### ``union(S1,S2,S3)
Per salvare in S3 gli elementi appartenenti all'unione delle liste S2 e S3.


> [!Prolog] Operare su liste
> Un programma che opera sulle liste è tipicamente formato da:
> C1) Caso base: lista vuota
> C2) Caso ricorsivo: isolo la Testa e ripeto sulla Coda.

---
# Cut
- L’effetto del CUT è quello di rimuove i punti di scelta fatti precedentemente all'invocazione del cut, rendendo definitive le scelte fatte nel corso della valutazione dall’interprete Prolog.
- Si consideri la clausola: ``p :- q1, q2,…, qi, !, qi+1, qi+2,…, qn
  Quando l'interprete arriva al cut, ossia quando `q1, q2,…, qi` sono stati valutati con esito di successo, il cut rimuove tutti i punti di scelta rimasti aperti. Ciò significa che se fallisce `qi+1` non è possibile fare backtracking ai predicati prima del cut.
- Dal punto di vista logico il CUT ha sempre successo.
- Utile per implementare la mutua esclusione di due clausole con lo stesso predicato in testa.
- Utile per aumentare l'efficienza di un programma, andando a fermare la risoluzione quando si arriva, ad esempio, alla prima risoluzione di successo.

---
# Negazione
Attraverso la risoluzione SLD, non è possibile derivare informazioni negative.

###### Regola SAFE
Una regola di calcolo si dice **SAFE** se seleziona un letterale negativo solo quando è "ground”.

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
E' Corretta e Completa se gli atomi negativi sono ground.

Sia `:- L1,...,Lm` il goal (generale) corrente, in cui `L1, ..., Lm` sono letterali (atomi o negazioni di atomi). Un passo di risoluzione SLDNF si schematizza come segue: 
- Si seleziona il letterale `Li`
- Se Li è positivo, si compie un passo ordinario di risoluzione SLD
- Se Li è negativo, ma non [[8a) Logica dei predicati del primo ordine (FOL)#Formule ground|ground]], si scarta e si prosegue alla selezione del successivo.
- Se Li è negativo del tipo ~A (con A [[8a) Logica dei predicati del primo ordine (FOL)#Formule ground|ground]]) ed A fallisce finitamente (cioè ha un albero SLD di fallimento finito), `Li` ha successo e si ottiene il nuovo risolvente
   `:- L1, ..., Li-1, Li+1, ..., Lm`

###### Problema dei quantificatori in SDLNF
Utilizzare SDLNF con atomi non ground genera interpretazioni sbagliate.
```
capitale(roma). 
capoluogo(bologna). 
citta(X) :- capitale(X). 
citta(X) :- capoluogo(X).

:- ~ capitale(X)
```
ossia
$∃X ∼ capitale(X)$
Con SDLNF si cerca una risoluzione per 
$∃Xcapitale(X)$
Una volta arrivati al risultato (se di successo allora true, altrimenti false) si nega il risultato (perché SDLNF cerca il fallimento, che negato diventa una successo):
$∼ (∃Xcapitale(X))$
$∀X(∼ capitale(X))$
ossia "tutte le X non sono capitali" che è diverso da "esiste una X che non è capitale"

### Negazione in Prolog
Prolog non adotta una regola di selezione SAFE perché è sempre left-most, quindi può capitare che un attributo negato del goal non è ground, portando ad una valutazione scorretta. Questo perché l'atomo non ground può risultare vero incorrettamente, quindi diventa falso, rendendo falso l'intero goal.
In Prolog si utilizza il predicato `not` che è realizzato in questo modo:
```
not(P) :- call(P), !, fail.
not(P).
```

---
## Metapredicati

###### `call(T)
Tratta il termine T come un predicato e ne richiede la valutazione all’interprete Prolog. Al momento della valutazione, T deve essere istanziato a un termine non numerico, contenente eventualmente delle variabili.
```run-prolog
p(X):- call(X). 
q(a). 

%query
p(q(Y)).
```

###### `fail`
La valutazione del predicato fail fallisce sempre.

###### `setof(X,P,S)`
S è la lista *senza ripetizioni* delle istanze X che soddisfano il goal P.
Se S è vuoto, il predicato fallisce.
###### ``bagof(X,P,S)
S è l'insieme (con eventuali ripetizioni) delle istanze X che soddisfano il goal P.
Se S è vuoto, il predicato fallisce.
```run-prolog
p(1). p(2). p(0). p(1). q(2). r(7).
%query
setof(X,p(X),S).

```

```run-prolog
padre(giovanni,mario). 
padre(giovanni,giuseppe). 
padre(mario, paola). 
padre(mario,aldo). 
padre(giuseppe,maria).

% In S vanno tutti gli X per cui, per lo stesso valore di Y, padre(X,Y) e’ vera.
%query
setof(X, padre(X,Y), S).
```


```run-prolog
padre(giovanni,mario). 
padre(giovanni,giuseppe). 
padre(mario, paola). 
padre(mario,aldo). 
padre(giuseppe,maria).

% in S vanno tutti gli X per cui, per qualsiasi valore di Y, padre(X,Y) e’ vera.
%query
setof(X, Y^padre(X,Y), S).
```

###### `findall(X,P,S)`
E' equivalente al predicato setof con quantificazione esistenziale per le variabili nel predicato P (che non sono X).
findall restituisce in S la lista delle istanze di X *senza ripetizioni* per cui il predicato P è vero.
Se S è vuoto, il predicato non fallisce ma restituisce la lista vuota.