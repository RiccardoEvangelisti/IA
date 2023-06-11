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

###### Modus Pones (MP)

|  |  |
| --- | --- | --- |
| $(A, A → B)$  | equivale a | $B$ |

###### Specializzazione (Spec)

|  |  |
| --- | --- | --- |
| $∀X A$  | equivale a | $A(t)$ |
Sostituisce t ad ogni X in A.
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
# Dimostrazioni
Si vogliono dimostrare i teoremi a partire dalla teoria.

## Trasformazione di fbf in [[9) Logica dei predicati proposizionali#Clausola (generale)|clausole]]
Bisogna portare la fbf in disgiunzione di letterali, con le varabili quantificate universalmente in testa.
1) **Trasformazione in [[#Formule chiuse|fbf chiusa]]**
   es:
   $∀X(p(Y ) →∼ (∀Y (q(X, Y ) → p(Y ))))$
   diventa:
   $∀X∀Y (p(Y ) →∼ (∀Y (q(X, Y ) → p(Y ))))$

2) **Equivalenze per operatori logici**
   
| | |
| -- | --  | -- | 
| $a → b$ | equivale a | $∼a ∨ b$ |
| $a ∧ c → b$ | equivale a | $∼a \ ∨ ∼c ∨ b$ |
| $∼(a∨b)$ | equivale a (1a legge DEMORGAN) | $∼a ∧ ∼b$ |
| $∼(a∧b)$ | equivale a (2a legge DEMORGAN)| $∼a ∨ ∼b$ |
| $a ↔ b$ | equivale a | $a → b ∧ b → a$ |
| $a∧b$ | equivale a clausole separate | $a,b$ |

es continua:
