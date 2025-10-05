<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EventController extends Controller
{
    public function index()
    {
        if (!Auth::check()) {
            return response()->json(['message' => 'Não autenticado'], 401);
        }

        // Se quiser só eventos do usuário:
        $events = Event::where('user_id', Auth::id())->get();

        // Se quiser TODOS os eventos:
        // $events = Event::all();

        return response()->json(['events' => $events]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'event_date' => 'required|date',
        ]);

        $validatedData['user_id'] = Auth::id();

        $event = Event::create($validatedData);

        return response()->json(['event' => $event], 201);
    }

    public function show($id)
    {
        $event = Event::where('id', $id)
                      ->where('user_id', Auth::id())
                      ->first();

        if (!$event) {
            return response()->json(['message' => 'Evento não encontrado'], 404);
        }

        return response()->json(['event' => $event]);
    }

    public function update(Request $request, $id)
    {
        $event = Event::where('id', $id)
                      ->where('user_id', Auth::id())
                      ->first();

        if (!$event) {
            return response()->json(['message' => 'Evento não encontrado'], 404);
        }

        $validatedData = $request->validate([
            'title' => 'string|max:255',
            'location' => 'string|max:255',
            'event_date' => 'date',
        ]);

        $event->update($validatedData);

        return response()->json(['event' => $event]);
    }

    public function destroy($id)
    {
        $event = Event::where('id', $id)
                      ->where('user_id', Auth::id())
                      ->first();

        if (!$event) {
            return response()->json(['message' => 'Evento não encontrado'], 404);
        }

        $event->delete();

        return response()->json(['message' => 'Evento deletado com sucesso']);
    }
}
