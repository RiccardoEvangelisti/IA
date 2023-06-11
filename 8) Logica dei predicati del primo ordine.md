Logica che tratta variabili e quantificazioni.
Per definire correttamente la [[1) Sistemi basati sulla conoscenza#^KB|Knowledge Base]] di un problema, si utilizza come linguaggio formale questa logica.

# Sintassi
###### Connettivi/operatori logici
- $∼$ negazione
- $∧$ congiunzione, AND
- $∨$ disgiunzione, OR 
- $←$ implicazione, SE
- $↔$ equivalenza, SE e SOLO SE
- parentesi $(  )$ 
- quantificatore esistenziale $∃$ ed universale $∀$. Il campo di azione di un quantificatore è la sola fbf che segue immediatamente, oppure le parentesi subito successive.

###### Regole di precedenza tra operatori
1. ~ ⱻ Ɐ 
2. ˄ 
3. ˅ 
4. ← ↔

###### Costante
Singola entità del dominio del discorso con iniziale minuscola, o numero (es. “maria”, “giovanna”, “3”).

###### Variabile
Entità non note del dominio con iniziale maiuscola (es. X, Y).
###### Variabile libera
Variabile che non compare all’interno del campo di azione di un quantificatore. Noi presupporremo sempre che le variabili sono quantificate o universalmente o esistenzialmente.

###### Predicato n-ari
Generica relazione che può essere vera o falsa fra $n$ oggetti del dominio del discorso (es. parente(giovanna,maria)). In Prolog, sono i *fatti*.

###### Funzione n-arie
Individua univocamente un oggetto del dominio del discorso mediante una relazione tra altri $n$ oggetti del dominio (es. madre(maria)). Le funzioni, in logica, non presuppongono alcun concetto di valutazione. In Prolog sono le *regole*.

###### Termine
E' ogni variabile, ogni costante, e infine se $f$ è un simbolo di funzione n-aria e $t1, .., tn$ sono termini, allora $f(t1, ..., tn)$ è ancora un termine.

###### Espressione o formula
Sequenza di simboli appartenenti all’alfabeto.

###### Atomo o formula atomica
E' l'applicazione di un simbolo di predicato n-ario $p$ ad $n$ termini $t1, ..., tn$: $p(t1, ..., tn)$ (es. fratello(giovanni, marco)).

###### Formula ben formata (fbf)
E' una frase sintatticamente corretta del linguaggio, che si ottiene combinando formule atomiche, usando connettivi e quantificatori.
Sono definite ricorsivamente come segue:
- ogni atomo è una fbf
- se A e B sono fbf allora lo sono anche ∼ A, A∧B, A∨B, A → B, A ↔ B con eventuali parentesi bilanciate
- se A è una fbf, ed X è una variabile, allora lo sono anche ∀XA ed ∃XA

###### fbf in forma normale prenessa disgiuntiva
Disgiunzione di una o più fbf composte da congiunzioni di letterali. Le quantificazioni compaiono tutte in testa alla fbf.

###### fbf in forma normale prenessa congiuntiva
Congiunzione di una o più fbf composte da disgiunzioni di letterali. Le quantificazioni compaiono tutte in testa alla fbf.

###### Formule chiuse
fbf che non contengono variabili libere, ossia non contengono variabili che non compaiono all’interno del campo di azione di un quantificatore.

###### Formule ground
Formule che non contengono variabili.

###### Formula composta
Formula composta da più formule connesse dai connettivi logici.

###### Letterale
E' una fbf atomica o la sua negazione.

---
# Semantica

###### Interpretazione
Dato un linguaggio del primo ordine L, un’interpretazione per L definisce un dominio non vuoto D e assegna: 
- a ogni simbolo di costante in C, una costante in D 
- a ogni simbolo di funzione n-ario F, una funzione F: Dn -> D 
- a ogni simbolo di predicato n-ario in P una relazione in Dn, cioè un sottoinsieme di Dn

**Interpretazione I1**: 
- D: numeri naturali 
- 0: il numero zero 
- s: rappresenta il successore di un numero naturale 
- p: rappresenta la relazione binaria ≤

**Interpretazione I2**: 
- D: numeri interi negativi 
- 0: il numero zero 
- s: rappresenta il predecessore di un numero naturale 
- p: rappresenta la relazione binaria ≤


## Valore di verità
Data una certa [[#Interpretazione]]:
- [[#Atomo o formula atomica]] è *vera* quando il predicato è *vero* (cioè quando la corrispondente relazione è vera nel dominio)
- [[#Formula composta]] è *vera* se sono vere le sue componenti rispettando le [[#Regole di precedenza tra operatori]]:![[Pasted image 20230610173005.png]]
- Formula quantificata esistenzialmente è *vera* se esiste almeno un elemento d del dominio D tale che la formula F', ottenuta assegnando d alla variabile X, è vera in I. In caso contrario F ha valore falso.
- Formula quantificata universalmente ⱯX F è *vera* se per ogni elemento d del dominio D, la formula F', ottenuta da F sostituendo d alla variabile X, è vera in I. Altrimenti F ha valore falso.


###### Modello
Una [[#Interpretazione]] I è un modello per una fbf chiusa F se e solo se F è vera in I.

###### fbf soddisfacibile
Se e solo se è vera almeno in una interpretazione, ovvero se esiste almeno un modello per essa.

###### fbf logicamente valida
Se è vera per tutte le possibili interpretazioni, cioè per cui ogni possibile interpretazione è un modello. (es F˅(~F) è logicamente valida)

###### Insieme soddisfacibile
Un insieme di formule chiuse del primo ordine S è soddisfacibile se esiste un'interpretazione che soddisfa tutte le formule di S, cioè che è un modello per ciascuna formula.

###### ==Conseguenza logica |= (entailment)==
Una fbf F è conseguenza logica (o segue logicamente) da un insieme di formule S (e si scrive S |= F) se condividono gli stessi modelli (cioè le stesse interpretazioni).

###### Sistemi di refutazione
Sono basati su questa proprietà: per dimostrare S |= F supposto S soddisfacibile è sufficiente dimostrare che S∪{~F} è insoddisfacibile.


*Come determinare se F segue logicamente da S?
1) *utilizzando interpretazioni e modelli. Le tavole di verità però sono troppo complesse e il dominio di interpretazione è estremamente grande, se non infinito.
2) *utilizzando solo semplici trasformazioni sintattiche, possibilmente ripetitive e quindi automatizzabili, e non introducendo concetti quali significato o interpretazione o modello. --> Ecco la Teoria assiomatica

# Teoria assiomatica
La logica dei [[9) Logica dei predicati proposizionali|predicati proposizionali]] e [[8) Logica dei predicati del primo ordine| dei predicati del primo ordine]] può essere formulata come sistema assiomatico-deduttivo, in cui:
- **Assiomi**: sono le fbf vere. ^assioma
- **Regole di inferenza**: sono dei criteri di manipolazione sintattica che trasformano fbf in equivalenti fbf. Inferenza=derivazione. ^regole-di-inferenza
- **Teoremi**: sono fbf, risultato dell'applicazione delle regole di inferenza.

### Regole di inferenza e semplificazioni

| | |
| --- | --- | --- |
|$A ∧ B$ | equivale a | $(∼ (A → (∼ B)))$
| $A ∨ B$ | equivale a | $((∼ A) → B)$
| $(A = B)$ | equivale a | $((A → B) ∧ (B → A))$
| $∃X A$ | abbrevia | $∼ (∀X ∼ A)$
| $∀X A$ | abbrevia | $∼ (∃X ∼ A)$
|  |  |
| $(A, A → B)$  | equivale a (Modus Pones-MP)| $B$ |
|  |  |
| $∀X A$  | equivale a (Specializzazione-Spec*) | $A(t)$ |
*Sostituisce t ad ogni X in A.
Data una formula quantificata universalmente, è possibile derivare una formula più specifica, ovvero una fbf identica all'originale in cui la variabile X è sostituita da un elemento specifico del dominio (costante o funzione). È ovvio infatti che se diciamo che una formula vale ovunque, allora deve valere anche per un caso specifico.


### Dedicibilità
Una teoria è decidibile se esiste sempre un metodo meccanico per stabilire se una qualunque fbf è un teorema oppure no.

###### Teoria (di predicati del primo ordine)
E' un insieme di [[#^assioma|assiomi]].

###### Modello di teoria
Un modello di una teoria è un’interpretazione che soddisfa tutti gli assiomi della teoria (assiomi logici e assiomi propri).

###### Teoria soddisfacibile/consistente
Se ha almeno un [[#Modello di teoria|modello]].


### ==Correttezza== (soundness)
Una teoria assiomatica è corretta se i teoremi dimostrati seguono logicamente dagli assiomi della teoria.

### ==Completezza== (completeness)
Una teoria assiomatica è completa se tutte le fbf che seguono logicamente dalla teoria possono essere dimostrati come teoremi della teoria.

Se T è corretta e completa è garantita l’equivalenza tra l'aspetto sintattico e semantico, ossia quello che faccio a livello sintattico equivale a quello che faccio a livello semantico.

![[Pasted image 20230611105552.png]]

### Monotonicità
Una teoria è monotona se l’aggiunta di nuovi assiomi non invalida i teoremi trovati precedentemente.
- Sia Th(T) l'insieme dei teoremi derivabili dalla teoria T. Allora T è monotona se $Th(T) ⊆ Th(T∪H)$ per qualunque insieme aggiuntivo di assiomi H.
- Esistono regole di inferenza non monotone, ad esempio la regola nota come Assunzione di Mondo Chiuso ("Closed World Assumption" o CWA): $∼(T |= A)$  equivale a $∼A$, cioè se A non è conseguenza logica della teoria, allora il suo negato fa parte della teoria.

---
---
# Dimostrazioni dei teoremi
Si vogliono dimostrare i teoremi a partire dalla teoria.

Per applicare il [[9) Logica dei predicati proposizionali#1. Principio di Risoluzione|Principio di Risoluzione]], dobbiamo:
1) trasformare la KB da fbf a clausole generali, generando una nuova teoria:
    - *Qualunque teoria del primo ordine T può essere trasformata in una teoria T’ in forma a clausole.* 
    - *T è insoddisfacibile se e solo se T' è insoddisfacibile. Quindi se una formula viene dimostrata in T', è dimostrata anche in T*
1) per ottenere il risolvente, si utilizza l'algoritmo di unificazione

## Trasformazione di fbf in [[9) Logica dei predicati proposizionali#Clausola (generale)|clausole]]

1) **Trasformazione in [[#Formule chiuse|fbf chiusa]]**
   es:
   $∀X(p(Y ) →∼ (∀Y (q(X, Y ) → p(Y ))))$
   diventa:
   $∀X∀Y (p(Y ) →∼ (∀Y (q(X, Y ) → p(Y ))))$

2) **Equivalenze per operatori logici**
   es continua:
   $∀X∀Y (∼ p(Y )∨ ∼ (∀Y (∼ q(X, Y ) ∨ p(Y ))))$
   
| | | |
| -- | --  | -- | -- |
| $a → b$ | equivale a | $∼a ∨ b$ |
| $a ∧ c → b$ | equivale a | $∼a \ ∨ ∼c ∨ b$ |
| $∼(a∨b∨...∨c)$ | equivale a (1a legge DEMORGAN) | $∼a ∧ ∼b∧ ...∧∼c$ | il negato di OR sono AND negati
| $∼(a∧b...∧c)$ | equivale a (2a legge DEMORGAN)| $∼a ∨ ∼b∨...∨∼c$ | il negato di AND sono OR negati
| $a ↔ b$ | equivale a | $a → b ∧ b → a$ |
| $a∧b$ | equivale a clausole separate | $a,b$ |

3) **Portare TUTTE le negazioni a ridosso degli atomi**
   es continua:
   $∀X∀Y (∼ p(Y )∨ (∃Y ∼(∼ q(X, Y ) ∨ p(Y ))))$
   $∀X∀Y (∼ p(Y )∨ (∃Y(q(X, Y ) \land ∼p(Y ))))$
   
| | |
| --- | --- | --- |
| $∃X A$ | abbrevia | $∼ (∀X ∼ A)$
| $∀X A$ | abbrevia | $∼ (∃X ∼ A)$

4) **Cambiamento dei nomi di variabile (in caso di conflitti)**
   C'è conflitto quando più quantificatori si riferiscono a variabili diverse con lo stesso nome. Si cambia il nome di una variabile nel suo quantificatore e ogni volta che compare all'interno dello scope del quantificatore.
   es continua:
   $∀X∀Y (∼ p(Y)∨ (∃Z(q(X, Z) \land ∼p(Z))))$

5) **Spostamento di TUTTI i quantificatori in testa alla formula**
   es continua:
   $∀X∀Y∃Z (∼ p(Y)∨ (q(X, Z) \land ∼p(Z)))$

6) **Trasformazione in fbf come congiunzione di disgiunzioni**
   es continua:
   $∀X∀Y ∃Z((∼ p(Y ) ∨ q(X, Z))∧ (∼ p(Y )∨ ∼ p(Z))))$
   
| | | |
| --- | --- | --- | ---|
| $(a \lor b ) \lor c$ | equivale a | $a \lor (b \lor c)$ | proprietà associativa OR
| $(a \land b ) \land c$ | equivale a | $a \land (b \land c)$ | proprietà associativa AND
| $a \lor (b  \land c)$ | equivale a | $(a \lor b) \land (a \lor c)$ | proprietà distributiva OR
| $a \land (b  \lor c)$ | equivale a | $(a \land b) \lor (a \land c)$ | proprietà distributiva AND
| $a \lor (a  \land b)$ | equivale a | $a$ | proprietà Absorption OR
| $a \land (a  \lor b)$ | equivale a | $a$ | proprietà Absorption AND
| $a \lor a$ | equivale a | $a$ | proprietà di idempotenza OR
| $a \land a$ | equivale a | $a$ | proprietà di idempotenza AND

7) **Skolemizzazione**
   Ogni variabile quantificata esistenzialmente viene sostituita da una **funzione (di Skolem)** delle variabili quantificate universalmente che la precedono.
   es continua:
   $∀X∀Y((∼ p(Y) ∨ q(X, f(X,Y)))∧ (∼ p(Y )∨ ∼ p(f(X,Y))))$

8) **Eliminazione dei quantificatori universali**
   es continua:
   $(∼ p(Y) ∨ q(X, f(X,Y)))∧ (∼ p(Y )∨ ∼ p(f(X,Y)))$

9) Scrivere come insieme di clausole, spezzando gli AND
   es continua:
   $\{∼ p(Y ) ∨ q(X, f(X, Y )), ∼ p(Y )∨ ∼ p(f(X, Y ))\}$

10) Rinominare le variabili in modo tale che ogni clausola abbia variabili con nomi diversi dalle altre
   es continua:
   $\{∼ p(Y ) ∨ q(X, f(X, Y )), ∼ p(Z)∨ ∼ p(f(W, Z))\}$


---
## Unificazione
Procedimento di manipolazione formale usato per *stabilire quando due espressioni possono coincidere*, procedendo con opportune [[#Sostituzione|sostituzioni unificatrici]].
Possono esistere più sostituzioni unificatrici, ma si vuole individuare quella più generale chiamata **mgu, most general unifier**.

###### Sostituzione
Una sostituzione $σ$ è un insieme di legami di termini $T_i$ a simboli di variabili $X_i$ distinte, con $i = 1, ..., n$.
	$σ = \{X_1/T_1, X_2/T_2, ..., X_n/T_n\}$
- La sostituzione corrispondente all'insieme vuoto è detta **sostituzione identità** ($\epsilon$).
- L'applicazione di una sostituzione σ ad un'espressione E, si indica con $[E]_σ$ e produce una nuova espressione (detta **istanza**) ottenuta sostituendo simultaneamente ciascuna variabile $X_i$ dell'espressione con il corrispondente termine $T_i$ .
- La *composizione* di sostituzioni $σ_1σ_2$ applica prima $σ_1$ poi $σ_2$, cancellando le sostituzioni per cui il valore da sostituire e sostituito sono uguali.
- Una sostituzione $σ_1$ è **più generale** di un'altra $σ_2$, se esiste una sostituzione $σ_3$ tale che $σ_2$ = $σ_1σ_3$, ovvero *se esiste una trasformazione che genera $σ_2$ a partire da $σ_1$.*

![[Pasted image 20230611153822.png]]

##### Occur check
Se un termine variabile deve unificare con un secondo termine, l'occur check è il controllo che la variabile non compaia nel secondo termine. Altrimenti l'algoritmo entrerebbe in loop.
es:
$T1 = X$
$T2 = f(X)$
$s = \{X/f(X)\}$ porta ad un loop!!!
Prolog non effettua questo controllo e in tal caso entra in un loop in esecuzione:
$p(X, f(X)).$
$:-p(Y, Y ).$
risultato: $Y = f(f(f(f(....)))).$
Se p rappresentasse il predicato maggiore ed f la funzione successore, deriverebbe che esiste un numero maggiore di se' stesso: dimostrazione **non corretta**.

