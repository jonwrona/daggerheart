// "use client";
// import { createContext, useState, useEffect, useReducer } from "react";
// import { createDataPack } from "@/data/datapack";
// import type { Data } from "@/types/daggerheart/data";

// const LOCAL_STORAGE_KEY = "data";

// interface DataContext {
//   data: Data;
//   dispatch: (action: string, payload?: any) => void;
// }

// interface DataProviderProps {
//   children: React.ReactNode;
// }

// export const DataContext = createContext<DataContext>({
//   data: {},
//   dispatch: () => {},
// });

// type ActionRunner = (state: Data, payload?: any) => Partial<Data>;
// type ActionsMap = Record<
//   string,
//   {
//     name: string;
//     run: ActionRunner;
//   }
// >;

// const actions: ActionsMap = {
//   update: {
//     name: "UPDATE",
//     run: (state, payload: Data) => {
//       return {
//         ...state,
//         ...payload,
//       };
//     },
//   },
//   new_data_pack: {
//     name: "NEW_DATA_PACK",
//     run: (state, name: string = "New data pack") => {
//       const newDataPack = createDataPack(name);
//       return {
//         ...state,
//         [newDataPack.id as string]: newDataPack,
//       };
//     },
//   },
// };

// const buildActionsMap = () => {
//   const map: Record<string, string> = {};
//   Object.entries(actions).forEach(([key, { name }]) => (map[name] = key));
//   return map;
// };

// export const ACTIONS = Object.freeze(buildActionsMap());

// interface Action {
//   key: string;
//   payload?: any;
// }

// const reducer = (state: Data, { key, payload }: Action) => {
//   const action = actions[key];
//   if (!action) {
//     console.warn(`Unknown data action key: ${key}`);
//     return state;
//   }
//   const updated = action.run(state, payload);
//   return { ...state, ...updated };
// };

// export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [state, dispatch] = useReducer(reducer, {});

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const stored = window.localStorage.getItem(LOCAL_STORAGE_KEY);
//       if (stored) {
//         try {
//           const parsed = JSON.parse(stored);
//           runAction(ACTIONS.UPDATE, parsed);
//         } catch (e) {
//           console.warn("Failed to parse stored data:", e);
//         }
//       }
//       setIsLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     if (!isLoading) {
//       window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
//     }
//   }, [state, isLoading]);

//   const runAction = (key: string, payload?: any) => {
//     dispatch({ key, payload });
//   };

//   return (
//     <DataContext.Provider value={{ data: state, dispatch: runAction }}>
//       {children}
//     </DataContext.Provider>
//   );
// };
