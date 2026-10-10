import axios from "axios";
import { AccountClient } from "../../src/client/AccountClient";

// Мокаем axios для юнит-тестов
jest.mock("axios", () => {
  const mockInstance = {
    request: jest.fn(),
  };
  return {
    create: jest.fn(() => mockInstance),
    isAxiosError: jest.fn(() => false),
    __mockInstance: mockInstance,
  };
});

function getMockAxios() {
  return (axios as any).__mockInstance;
}

describe("AccountClient", () => {
  let client: AccountClient;

  beforeEach(() => {
    jest.clearAllMocks();
    client = new AccountClient("test-account-token");
  });

  describe("создание клиента", () => {
    it("должен передавать заголовок X-Haskimail-Account-Token", () => {
      new AccountClient("acc-token");
      expect(axios.create).toHaveBeenCalledWith(
        expect.objectContaining({
          headers: expect.objectContaining({
            "X-Haskimail-Account-Token": "acc-token",
          }),
        })
      );
    });
  });

  describe("серверы", () => {
    it("getServers - должен отправить GET на /servers", async () => {
      getMockAxios().request.mockResolvedValueOnce({
        data: { TotalCount: 2, Servers: [] },
      });

      const result = await client.getServers();

      expect(getMockAxios().request).toHaveBeenCalledWith(
        expect.objectContaining({
          method: "GET",
          url: "/servers",
        })
      );
      expect(result.TotalCount).toBe(2);
    });

    it("createServer - должен отправить POST на /servers", async () => {
      getMockAxios().request.mockResolvedValueOnce({
        data: { ID: 1, Name: "Мой сервер" },
      });

      await client.createServer({ Name: "Мой сервер", Color: "blue" });

      expect(getMockAxios().request).toHaveBeenCalledWith(
        expect.objectContaining({
          method: "POST",
          url: "/servers",
          data: expect.objectContaining({ Name: "Мой сервер" }),
        })
      );
    });

    it("deleteServer - должен отправить DELETE на /servers/{id}", async () => {
      getMockAxios().request.mockResolvedValueOnce({
        data: { ErrorCode: 0, Message: "OK" },
      });

      await client.deleteServer(5);

      expect(getMockAxios().request).toHaveBeenCalledWith(
        expect.objectContaining({
          method: "DELETE",
          url: "/servers/5",
        })
      );
    });
  });

  describe("домены", () => {
    it("getDomains - должен отправить GET на /domains", async () => {
      getMockAxios().request.mockResolvedValueOnce({
        data: { TotalCount: 1, Domains: [{ ID: 1, Name: "example.com" }] },
      });

      const result = await client.getDomains();

      expect(getMockAxios().request).toHaveBeenCalledWith(
        expect.objectContaining({
          method: "GET",
          url: "/domains",
        })
      );
      expect(result.TotalCount).toBe(1);
    });

    it("createDomain - должен отправить POST на /domains", async () => {
      getMockAxios().request.mockResolvedValueOnce({
        data: { ID: 2, Name: "new.domain.ru" },
      });

      await client.createDomain({ Name: "new.domain.ru" });

      expect(getMockAxios().request).toHaveBeenCalledWith(
        expect.objectContaining({
          method: "POST",
          url: "/domains",
          data: expect.objectContaining({ Name: "new.domain.ru" }),
        })
      );
    });

    it("verifyDomainDKIM - должен отправить PUT на /domains/{id}/verifyDkim", async () => {
      getMockAxios().request.mockResolvedValueOnce({
        data: { ID: 1, DKIMVerified: true },
      });

      await client.verifyDomainDKIM(1);

      expect(getMockAxios().request).toHaveBeenCalledWith(
        expect.objectContaining({
          method: "PUT",
          url: "/domains/1/verifyDkim",
        })
      );
    });

    it("verifyDomainSPF - должен отправить PUT на /domains/{id}/verifyspf", async () => {
      getMockAxios().request.mockResolvedValueOnce({
        data: { ID: 1, SPFVerified: true },
      });

      await client.verifyDomainSPF(1);

      expect(getMockAxios().request).toHaveBeenCalledWith(
        expect.objectContaining({
          method: "PUT",
          url: "/domains/1/verifyspf",
        })
      );
    });

    it("deleteDomain - должен отправить DELETE на /domains/{id}", async () => {
      getMockAxios().request.mockResolvedValueOnce({
        data: { ErrorCode: 0, Message: "OK" },
      });

      await client.deleteDomain(3);

      expect(getMockAxios().request).toHaveBeenCalledWith(
        expect.objectContaining({
          method: "DELETE",
          url: "/domains/3",
        })
      );
    });
  });

  describe("шаблоны", () => {
    it("pushTemplates - должен отправить PUT на /templates/push", async () => {
      getMockAxios().request.mockResolvedValueOnce({
        data: { TotalCount: 3, Templates: [] },
      });

      await client.pushTemplates({
        SourceServerID: 1,
        DestinationServerID: 2,
        PerformChanges: true,
      });

      expect(getMockAxios().request).toHaveBeenCalledWith(
        expect.objectContaining({
          method: "PUT",
          url: "/templates/push",
        })
      );
    });
  });
});
