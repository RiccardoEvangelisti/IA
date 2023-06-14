La pianificazione automatica (planning) rappresenta un’importante attività di problem solving che consiste nel sintetizzare una sequenza di azioni che eseguite da un agente a partire da uno stato “iniziale” del mondo provocano il raggiungimento di uno stato “desiderato”.

Un pianificatore automatico è un agente intelligente che opera in un certo dominio e che date: 
• Una rappresentazione dello stato iniziale 
•Una rappresentazione del goal 
• Una descrizione formale delle azioni eseguibili sintetizza dinamicamente il piano di azioni necessario per raggiungere il goal a partire dallo stato iniziale.

# Pianificazione classica
La pianificazione classica è un tipo di pianificazione off-line che produce l’intero piano prima di eseguirlo lavorando su una rappresentazione istantanea (snapshot) dello stato corrente.

### 1. Planning deduttivo
La tecnica di pianificazione deduttiva utilizza la logica per rappresentare stati, goal e azioni e genera il piano come dimostrazione di un teorema.

###### Situation Calculus
È una formalizzazione del linguaggio (basato sulla logica dei predicati del primo ordine) in grado di rappresentare stati e azioni in funzione del tempo.
Situation significa “fotografia” del mondo e delle proprietà (**fluent**) che valgono in un determinato istante/stato s.
Le azioni definiscono quali fluent saranno veri come risultato di un’azione.
Ogni azione ci porta in un nuovo stato.
Per costruire un piano ci servono la deduzione e la dimostrazione di un goal.
- Vantaggi: elevata espressività, permette di descrivere problemi complessi. 
- Problema: **frame problem**. Occorre specificare esplicitamente tutti i fluent che cambiano dopo una transizione di stato e anche quelli che NON cambiano. Al crescere della complessità del dominio il numero di tali assiomi cresce enormemente.
###### Situation Calculus e Risoluzione
Si usa il Situation Calculus per costruire un pianificatore basato sul metodo di risoluzione.
Si cerca la prova di una formula contenente una variabile di stato che alla fine della dimostrazione sarà istanziata al piano di azioni che permette di raggiungere l’obiettivo.
Le azioni si esprimono con assiomi nella forma a clausole.

---
### 2. Planning mediante ricerca
Utilizza linguaggi specializzati per rappresentare stati, goal e azioni e gestisce la generazione del piano come un problema di ricerca (search).
La ricerca può essere effettuata: 
• Nello spazio degli stati o situazioni: nell’albero di ricerca ogni nodo rappresenta uno stato e ogni arco un’azione 
• Nello spazio dei piani: nell’albero di ricerca ogni nodo rappresenta un piano parziale e ogni arco un’operazione di raffinamento del piano.

##### 2.1 Planning Lineare (Ricerca nello spazio degli stati)
Un pianificatore lineare riformula il problema di pianificazione come problema di ricerca nello spazio degli stati e utilizza le strategie di ricerca classiche in forward e backward.

###### STRIPS (Stanford Research Institute Problem Solver)
E' un pianificatore lineare basato su ricerca backward, che permette di rappresentare azioni con sintassi molto semplice ed efficiente. Assume che lo stato iniziale sia completamente noto (Closed World Assumption).
Il linguaggio di STRIPS: 
• rappresenta lo stato attraverso un insieme di fluent che valgono nello stato. Ad esempio: on(b,a), clear(b), clear(c), ontable(c), etc. . . 
• rappresenta il goal, similmente allo stato, attraverso un insieme di fluent e può avere variabili, ad esempio: on(X, a)
• rappresenta le azioni/regole mediante tre liste: 
	– PRECONDIZIONI: fluent che devono essere veri per applicare l’azione 
	– DELETE: fluent che diventano falsi come risultato dell’azione 
	– ADD: fluent che diventano veri come risultato dell’azione

Vale la cosiddetta STRIPS Assumption: Tutto ciò che non è specificato nella ADD e DELETE list resta immutato. Ciò risolve il "frame problem" tipico del Planning Deduttivo.

I problemi che tipicamente si hanno con con questo algoritmo risiedono nel fatto che il grafo di ricerca è molto vasto (soluzione: applicare strategie euristiche) e nell’interazione tra i goal: quando due o più goal interagiscono ci possono essere problemi di interazione tra le soluzioni (ad esempio l’anomalia di Sussman).
###### Anomalia di Sussman
L’anomalia di Sussman è un problema che sorge nella pianificazione lineare quando un goal viene diviso in più sottogoal, da soddisfare uno dopo l’altro. Questo può portare a definire più sottogoal che interagiscono in modo tale che soddisfare un goal richieda di smettere di soddisfarne un altro.
L’anomalia evidenzia la non completezza della pianificazione lineare e la necessità di offrire interleaving, ovvero la possibilità di compiere azioni pertinenti a più sottogoal diversi, per poter rendere completo un algoritmo di questo tipo.
Esempio: impilare tre blocchi A,B,C (con A in alto, B al centro, C in basso). Lo stato iniziale è come in figura:
![[Pasted image 20230614002349.png]]
Un pianificatore lineare suddivide il goal nei due sottogoal “impila A su B” e “impila B su C”.
Se proseguiamo con il primo sottogoal, ci si ritrova nella situazione seguente:
![[Pasted image 20230614002543.png]]
in cui non è più possibile risolvere il secondo sottogoal.
Al contrario, se all'inizio cerchiamo il secondo sottogoal, la situazione diventa la seguente:
![[Pasted image 20230614002659.png]]
che non soddisfa il primo sottogoal.
*E possibile arrivare al goal finale, ma non in maniera efficiente, il che mette in mostra una debolezza della pianificazione lineare.*

#### 2.2 Planning non lineare (Ricerca nello spazio dei piani)
I pianificatori non lineari sono algoritmi di ricerca che gestiscono la generazione di un piano come un problema di ricerca nello spazio dei piani e non più degli stati. L’algoritmo non genera più il piano come una successione lineare (completamente ordinata) di azioni per raggiungere i vari obiettivi.