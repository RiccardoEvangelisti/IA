Si divide in due classi:
- **logica proposizionale**: non tratta variabili. ^logica-proposizionale
- **logica dei predicati**: tratta variabili e quantificazioni. ^logica-dei-predicati

#### Logica dei predicati del primo ordine
Per definire correttamente la [[1) Sistemi basati sulla conoscenza#^KB|Knowledge Base]] di un problema, si utilizza come linguaggio formale questa logica.

I connettivi logici sono:
- $∼$ negazione
- $∧$ congiunzione, AND
- $∨$ disgiunzione, OR 
- $←$ implicazione, SE
- $↔$ equivalenza, SE e SOLO SE
- parentesi $(  )$ 
- quantificatore esistenziale $∃$ ed universale $∀$. Il campo di azione di un quantificatore è la sola fbf che segue immediatamente 

###### Costante
Singola entità del dominio del discorso con iniziale minuscola, o numero (es. “maria”, “giovanna”, “3”).

###### Variabile
Entità non note del dominio con iniziale maiuscola (es. X, Y).

###### Predicato n-ari
Generica relazione che può essere vera o falsa fra $n$ oggetti del dominio del discorso (es. parente(giovanna,maria)). In Prolog, sono i *fatti*.

###### Funzione n-arie
Individua univocamente un oggetto del dominio del discorso mediante una relazione tra altri $n$ oggetti del dominio (es. madre(maria)). Le funzioni, in logica, non presuppongono alcun concetto di valutazione. In Prolog sono le *regole*.

###### Termine
E' ogni variabile, ogni costante, e infine se $f$ è un simbolo di funzione n-aria e $t1, .., tn$ sono termini, allora $f(t1, ..., tn)$ è ancora un termine.

###### Atomo o formula atomica
E' l'applicazione di un simbolo di predicato n-ario $p$ ad $n$ termini $t1, ..., tn$: $p(t1, ..., tn)$ (es. fratello(giovanni, marco)).

###### Espressione o formula
Sequenza di simboli appartenenti all’alfabeto.

###### Formula ben formata (fbf)
E' una frase sintatticamente corretta del linguaggio, che si ottiene combinando formule atomiche, usando connettivi e quantificatori.
Sono definite ricorsivamente come segue:
- ogni atomo è una fbf
- se A e B sono fbf allora lo sono anche ∼ A, A∧B, A∨B, A → B, A ↔ B con eventuali parentesi bilanciate
- se A è una fbf, ed X è una variabile, allora lo sono anche ∀XA ed ∃XA

