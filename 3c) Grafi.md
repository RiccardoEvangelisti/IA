I grafi permettono di raggiungere uno stesso stato percorrendo cammini differenti, a differenza degli alberi. In tal caso, significa che esistono più cammini che portano in quello stato, e dunque si possono scartare eventuali cammini ciclici ed evitare che lo spazio degli stati divendi infinito per colpa dei cicli. *Gli algoritmi che dimenticano la propria storia sono condannati a ripeterla.*

Per la relizzazione algoritmica del **Graph Search**, c'è bisogno di due liste: lista dei nodi chiusi (ovvero dei nodi espansi e rimossi dalla lista per evitare di esaminarli nuovamente) e lista dei nodi aperti (ovvero quelli ancora da esaminare). Se il nodo corrente corrisponde ad un nodo della lista chiusa, non viene espanso ma scartato.

