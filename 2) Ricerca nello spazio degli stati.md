I problemi si possono modellare come problemi di ricerca in uno spazio degli stati.
###### Spazio degli stati
E' l'insieme di tutti gli stati raggiungibili dallo stato iniziale con una qualunque sequenza di operatori. E' caratterizzato da:
- Stato iniziale e in cui l'agente sa di trovarsi (non noto a priori).
- Insieme di azioni possibili che sono disponibili all'agente.
- Cammini che sono sequenze di azioni che conducono da uno stato a un altro.
Dopo ogni azione è necessario verificare se è stato raggiunto il goal, dunque se lo stato presente appartiene all'insieme degli stati goal.

###### Sistema di produzioni monotòno
Un sistema è monotòno quando viene dimostrata vera una regola, e non può negli stati successivi essere dimostrata falsa. Il sistema può solo crescere, non calare. Una regola non può essere vera in uno stato e falsa in un altro.
I sistemi di logica pura sono monotòni e si può applicare la scomposizione del problema in sotto-problemi.

###### Problema a stati singoli
Lo stato è sempre accessibile e l’agente conosce esattamente che cosa produce ciascuna delle sue azioni. Può calcolare esattamente in che stato sarà dopo qualunque sequenza di azioni. (noi tratteremo solo questi).

###### Problema a stati multipli
Lo stato non è completamente accessibile e l’agente deve ragionare su possibili stati che potrebbe raggiungere. L’effetto delle azioni può essere sconosciuto o imprevisto e serve una capacità di rilevamento durante la fase di esecuzione.