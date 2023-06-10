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
fbf che non contengono variabili libere, ossia non contengono variabili che non compaiono all’interno del campo di azione di un quantificatore.  Nel seguito considereremo solo formule fbf chiuse.

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
Un insieme di formule chiuse del primo ordine, S, è soddisfacibile se esiste un'interpretazione che soddisfa tutte le formule di S, cioè che è un modello per ciascuna formula.

###### Conseguenza logica |= 
Una fbf F è conseguenza logica (o segue logicamente) da un insieme di formuleS (e si scrive S |= F)