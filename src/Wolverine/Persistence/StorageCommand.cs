using System;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Oakton;
using Spectre.Console;
using Wolverine.Persistence.Durability;

namespace Wolverine.Persistence;

public enum StorageAction
{
    clear,
    counts,
    rebuild,
    release
}

public class StorageInput : NetCoreInput
{
    [Description("Choose the action")] public StorageAction Action { get; set; } = StorageAction.counts;

    [Description("Optional, specify the file where the schema script would be written")]
    public string FileFlag { get; set; } = "storage.sql";
}

[Description("Administer the envelope storage")]
public class StorageCommand : OaktonAsyncCommand<StorageInput>
{
    public StorageCommand()
    {
        Usage("Administer the envelope storage").Arguments(x => x.Action);
    }

    public override async Task<bool> Execute(StorageInput input)
    {
        using var host = input.BuildHost();
        var persistence = host.Services.GetRequiredService<IMessageStore>();

        persistence.Describe(Console.Out);

        switch (input.Action)
        {
            case StorageAction.counts:

                await persistence.Admin.RebuildAsync();

                var counts = await persistence.Admin.FetchCountsAsync();
                Console.WriteLine("Persisted Enveloper Counts");
                Console.WriteLine($"Incoming    {counts.Incoming.ToString().PadLeft(5)}");
                Console.WriteLine($"Outgoing    {counts.Outgoing.ToString().PadLeft(5)}");
                Console.WriteLine($"Scheduled   {counts.Scheduled.ToString().PadLeft(5)}");

                break;

            case StorageAction.clear:
                await persistence.Admin.ClearAllAsync();
                AnsiConsole.Write("[green]Successfully deleted all persisted envelopes[/]");
                break;

            case StorageAction.rebuild:
                await persistence.Admin.RebuildAsync();
                AnsiConsole.Write("[green]Successfully rebuilt the envelope storage[/]");
                break;

            case StorageAction.release:
                await persistence.Admin.RebuildAsync();
                Console.WriteLine("Releasing all ownership of persisted envelopes");
                await persistence.Admin.ReleaseAllOwnershipAsync();

                break;
        }

        return true;
    }
}