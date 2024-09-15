"use client";
import { IClient, ISession } from "@/app/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createContext, useContext, useState } from "react";

interface ClientListDropdownProps {
    clients: IClient[];
  onSelect?: (clientId: string) => void;
}

// ... existing Client interface ...

interface ClientContextType {
  selectedClient: IClient | null;
            setSelectedClient: (client: IClient | null) => void;
  clientSessions: ISession[];
  setClientSessions: (sessions: ISession[]) => void;
}

const ClientContext = createContext<ClientContextType | undefined>(undefined);

export const useClientContext = () => {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error("useClientContext must be used within a ClientProvider");
  }
  return context;
};

export const ClientProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedClient, setSelectedClient] = useState<IClient | null>(null);
  const [clientSessions, setClientSessions] = useState<ISession[]>([]);

  return (
    <ClientContext.Provider
      value={{
        selectedClient,
        setSelectedClient,
        clientSessions,
        setClientSessions,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};

const ClientListDropdown: React.FC<ClientListDropdownProps> = ({ clients }) => {
  const handleClientSelect = (clientId: string) => {
    console.log({ clientId });
  };
  return (
    <Select onValueChange={handleClientSelect}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a client" />
      </SelectTrigger>
      <SelectContent>
        {clients.length > 0 ? (
          clients.map((client) => (
            <SelectItem key={client._id} value={client._id}>
              {client.firstName} {client.lastName}
            </SelectItem>
          ))
        ) : (
          <SelectItem value="no-clients" disabled>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              No clients to show
            </div>
          </SelectItem>
        )}
      </SelectContent>
    </Select>
  );
};

export default ClientListDropdown;
