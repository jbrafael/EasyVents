<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreEventRequest; // Nova linha adicionada
use App\Http\Requests\UpdateEventRequest;
use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Str; // Necessário para gerar o slug

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $events = Event::with('user')->get();
        return response()->json($events);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $event = Event::with('user')->findOrFail($id);
        return response()->json($event);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEventRequest $request)
    {
        $validated = $request->validated();
        $validated['slug'] = Str::slug($validated['title'], '-');
        $validated['user_id'] = 1; // Temporariamente usando 1 até a autenticação

        $event = Event::create($validated);

        return response()->json($event, 201);
    }
    /**
 * Update the specified resource in storage.
 */
public function update(UpdateEventRequest $request, string $id)
{
    $event = Event::findOrFail($id);
    $event->update($request->validated());

    return response()->json($event, 200);
}

/**
 * Remove the specified resource from storage.
 */
public function destroy(string $id)
{
    $event = Event::findOrFail($id);
    $event->delete();

    return response()->json(null, 204); // Resposta sem conteúdo para sucesso de exclusão
}
}

